import { getTeamData, getUserByID } from '$lib/database';
import { events } from '$lib/stores';
import { verifyCookie } from '$lib/utils';

function getEvent(id) {
	for (let event of events) {
		if (event.id === id) {
			return event;
		}
	}

	return null;
}

function removeDuplicates(events) {
	let uSet = new Set(events);
	return [...uSet];
}

async function getUserData(id, usersData) {
	return new Promise(async (resolve, reject) => {
		for (let user of usersData) {
			if (user.id === id) {
				resolve({ user, usersData });
			}
		}

		try {
			const res = await getUserByID(id);
			if (res) {
				console.log(res);
				usersData.push(res);
				resolve({ user: res, usersData });
			} else {
				resolve({ user: false, usersData });
			}
		} catch (err) {
			console.log(err);
			resolve({ user: false, usersData });
		}
	});
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	try {
		if (!verifyCookie(request)) {
			return {
				status: 401,
				body: {
					error: true,
					message: 'unauthorized'
				}
			};
		}

		const data = await request.json();
		if (!data.hasOwnProperty('user')) {
			return {
				status: 400,
				body: {
					error: true,
					message: 'invalid data'
				}
			};
		}

		const user = await getUserByID(data.user);
		if (!user) {
			return {
				status: 404,
				body: {
					error: true,
					message: 'user not found'
				}
			};
		}

		let eventIds = removeDuplicates(user.events);

		let mainEventsData = [];
		let usersData = [];
		for (let eventID of eventIds) {
			const res = await getTeamData(eventID);
			if (!res) {
				return {
					status: 404,
					body: {
						error: true,
						message: 'event not found'
					}
				};
			}

			let mainEventsTemp = [];

			let eventTemp = {};
			let eventData = getEvent(res.id);

			if (eventData) {
				eventTemp.id = eventData.id;
				eventTemp.name = eventData.name;
				let usersTemp = [];
				for (let user of res.users) {
					let tempData = await getUserData(user, usersData);
					let dataUser = tempData.user;
					let usersArray = tempData.usersData;
					if (dataUser) {
						usersData = usersArray;
						let userObject = {
							id: dataUser.id,
							name: dataUser.name,
							email: dataUser.email
						};
						usersTemp.push(userObject);
					}
				}

				if (usersTemp.length > 0) {
					eventTemp.users = usersTemp;
				}
			}

			if (eventTemp) {
				mainEventsTemp.push(eventTemp);
			}

			mainEventsData.push({ teamId: eventID, data: mainEventsTemp });
		}

		return {
			status: 200,
			// @ts-ignore
			body: {
				error: false,
				result: mainEventsData
			}
		};
	} catch (err) {
		console.error(err);
		return {
			status: 500,
			body: {
				error: true,
				message: 'something went wrong'
			}
		};
	}
}
