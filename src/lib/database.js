// @ts-nocheck
import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

import {dbName, dbURL} from "../../config.json"

let cached = global.mongo;
if (!cached) {
	cached = global.mongo = { conn: null, promise: null };
}

export async function connect() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			useUnifiedTopology: true
		};

		cached.promise = MongoClient.connect(dbURL, opts).then((client) => {
			console.log('Successfuly Connected to DB');
			return {
				client,
				db: client.db(dbName)
			};
		});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

export async function addUser({
	name,
	roll,
	email,
	password,
	whatsapp,
	department,
	college,
	events
}) {
	return new Promise(async (resolve, reject) => {
		const connection = await connect();
		if (!connection) {
			reject("db isn't connected");
		}
		const collection = connection.db.collection('users');
		collection.insertOne(
			{
				name,
				roll,
				email,
				password,
				whatsapp,
				department,
				college,
				events: events ? events : [],
				premiumUser: false,
				eventUsers: []
			},
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		);
	});
}

export async function addEventData(event, id) {
	return new Promise(async (resolve, reject) => {
		const connection = await connect();
		if (!connection) {
			reject("db isn't connected");
		}
		const collection = connection.db.collection('events');
		collection.insertOne(
			{
				id,
				event
			},
			(err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			}
		);
	});
}

export async function getEventData(id) {
	return new Promise(async (resolve, reject) => {
		const connection = await connect();
		if (!connection) {
			reject("db isn't connected");
		}
		const collection = connection.db.collection('events');
		collection.findOne(
			{
				id: id
			},
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		);
	});
}

export async function getTeamData(id) {
	return new Promise(async (resolve, reject) => {
		const connection = await connect();
		if (!connection) {
			reject("db isn't connected");
		}
		const collection = connection.db.collection('teams');
		collection.findOne(
			{
				teamId: id
			},
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		);
	});
}

export async function deleteEventData(id) {
	return new Promise(async (resolve, reject) => {
		const connection = await connect();
		if (!connection) {
			reject("db isn't connected");
		}
		const collection = connection.db.collection('events');
		collection.deleteOne(
			{
				id: id
			},
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		);
	});
}

export async function getUserByEmail(email) {
	return new Promise(async (resolve, reject) => {
		const connection = await connect();
		if (!connection) {
			reject("db isn't connected");
		}
		const collection = connection.db.collection('users');
		collection.findOne(
			{
				email
			},
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		);
	});
}

export async function getUserByID(id) {
	return new Promise(async (resolve, reject) => {
		try {
			const connection = await connect();
			if (!connection) {
				reject("db isn't connected");
			}
			const collection = connection.db.collection('users');
			collection.findOne(
				{
					_id: new ObjectId(id)
				},
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		} catch (err) {
			console.error(err);
			reject(err);
		}
	});
}

export async function addEventById({ id, event, eventID, eventUsers }) {
	return new Promise(async (resolve, reject) => {
		try {
			const connection = await connect();
			if (!connection) {
				reject("db isn't connected");
			}
			const collection = connection.db.collection('users');
			collection.updateOne(
				{
					_id: new ObjectId(id)
				},
				{
					$push: {
						events: {
							name: event,
							id: eventID
						},
						eventUsers
					}
				},
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		} catch (err) {
			console.error(err);
			reject(err);
		}
	});
}

export async function updatePremiumByUser(user) {
	return new Promise(async (resolve, reject) => {
		try {
			const connection = await connect();
			if (!connection) {
				reject("db isn't connected");
			}
			const collection = connection.db.collection('users');
			collection.updateOne(
				{
					_id: new ObjectId(user)
				},
				{
					$set: {
						premiumUser: true
					}
				},
				(err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				}
			);
		} catch (err) {
			console.error(err);
			reject(err);
		}
	});
}
