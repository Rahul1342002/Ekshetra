<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ session }) {
		// @ts-ignore
		if (!session.user.authenticated) {
			return {
				status: 302,
				redirect: '/login'
			};
		} else {
			return {
				status: 200
			};
		}
	}
</script>

<script>
	import { events, eventStores, user, showPopup, isLoading } from '../../stores';
	import QRCode from 'qrcode-svg';

	var paymentData = {
		url: '',
		amount: '',
		event: ''
	};

	async function getPaymentLink(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch('/api/getPaymentLink', {
					method: 'POST',
					body: JSON.stringify(data)
				});

				const json = await res.json();
				resolve(json);
			} catch (err) {
				console.error(err);
				resolve(false);
			}
		});
	}

	function getQr(url) {
		if (url.length > 0) {
			var svg = new QRCode({
				content: url,
				xmlDeclaration: false,
				height: 150,
				width: 150
			}).svg();
			document.getElementById('qr-code').innerHTML = svg;
		}
	}

	let checkedValues = [false, false, false, false, false, false];
	eventStores.subscribe((value) => {
		checkedValues = value;
	});

	let totalPrice = 0.0;

	const Map = {
		1: 'First',
		2: 'Second',
		3: 'Third',
		4: 'Fourth'
	};

	function updateClick(i) {
		if (checkedValues[i] === true) {
			totalPrice -= events[i].price;
		} else {
			totalPrice += events[i].price;
		}
		checkedValues[i] = !checkedValues[i];
		eventStores.set(checkedValues);
	}

	function getIDName(event, i) {
		console.log(event);
		return event.id.toString() + '_' + i.toString();
	}

	var load = false;
	isLoading.subscribe((value) => {
		load = value;
	});

	async function createAndHandleLink() {
		let mainData = [];
		const userData = $user;
		if (!userData) {
			return;
		}

		for (let i = 0; i < checkedValues.length; i++) {
			if (checkedValues[i] === true) {
				let event = events[i];
				let eventdata = {
					id: event.id,
					users: []
				};
				for (let j = 1; j <= event.members; j++) {
					let value = document.getElementById(
						(i + 1).toString() + '_' + j.toString()
						// @ts-ignore
					).value;
					if (value.length === 0) {
						alert('Missing fields data');
						return;
					}

					eventdata.users.push(value);
				}
				mainData.push(eventdata);
			}
		}

		if (mainData.length > 0) {
			const eventData = {
				name: userData.name,
				email: userData.email,
				number: userData.whatsapp,
				event: mainData
			};

			isLoading.set(!load);
			try {
				const res = await getPaymentLink(eventData);
				isLoading.set(!load);
				console.log(res);
				if (!res) {
					alert('something went wrong. Please try again');
					return;
				}

				if (res?.error) {
					alert(res.message);
					return;
				}

				if (!res?.error) {
					paymentData.url = res.url;
					paymentData.amount = res.amount;
					paymentData.event = res.event;
					showPopup.set(true);
					console.log($showPopup);
				}
			} catch (err) {
				console.log(err);
				alert('something went wrong. Please try again');
				return;
			} finally {
				if (load === true) {
					isLoading.set(!load);
				}
			}
		}
	}

	async function paymentDone() {
		try {
			const res = await fetch('/api/userPaid', {
				method: 'POST',
				body: JSON.stringify({
					event: paymentData.event,
					amount: paymentData.amount
				})
			});

			const json = await res.json();
			if (json?.error) {
				alert(json?.message);
			}

			if (!json?.error) {
				alert(
					'We will contact you within 3 working days. For any more info, please go to contact us page and contact us via live chat / any whatsapp number'
				);
				window.location.replace('/profile');
			}
		} catch (err) {
			console.error(err);
			alert('something went wrong');
		}
	}

	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import jQuery from 'jquery';
	onMount(() => {
		const jq = jQuery;
		// jq('#popup').css({ height: jQuery('#cart').height() + 'px' });

		gsap.to('#loader', 1, { y: '-100%' });
		gsap.to('#loader', 1, { opacity: 0 });
		gsap.to('#loader', 0, { display: 'none', delay: 1 });
		gsap.to('#header', 0, { display: 'block', delay: 1 });
		gsap.to('#navigation-content', 0, { display: 'none' });
		gsap.to('#navigation-content', 0, { display: 'flex', delay: 1 });

		jq(function () {
			jq('.color-panel').on('click', function (e) {
				e.preventDefault();
				jq('.color-changer').toggleClass('color-changer-active');
			});
			jq('.colors a').on('click', function (e) {
				e.preventDefault();
				var attr = jq(this).attr('title');
				console.log(attr);
				jq('head').append('<link rel="stylesheet" href="css/' + attr + '.css">');
			});
		});
		jq(function () {
			jq('.menubar').on('click', function () {
				gsap.to('#navigation-content', 0.6, { y: 0 });
			});
			jq('.navigation-close').on('click', function () {
				gsap.to('#navigation-content', 0.6, { y: '-100%' });
			});
		});

		jq(function () {
			var TxtRotate = function (el, toRotate, period) {
				this.toRotate = toRotate;
				this.el = el;
				this.loopNum = 0;
				this.period = parseInt(period, 10) || 2000;
				this.txt = '';
				this.tick();
				this.isDeleting = false;
			};

			TxtRotate.prototype.tick = function () {
				var i = this.loopNum % this.toRotate.length;
				var fullTxt = this.toRotate[i];

				if (this.isDeleting) {
					this.txt = fullTxt.substring(0, this.txt.length - 1);
				} else {
					this.txt = fullTxt.substring(0, this.txt.length + 1);
				}

				this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

				var that = this;
				var delta = 200 - Math.random() * 100;

				if (this.isDeleting) {
					delta /= 2;
				}

				if (!this.isDeleting && this.txt === fullTxt) {
					delta = this.period;
					this.isDeleting = true;
				} else if (this.isDeleting && this.txt === '') {
					this.isDeleting = false;
					this.loopNum++;
					delta = 100;
				}

				setTimeout(function () {
					that.tick();
				}, delta);
			};

			var elements = document.getElementsByClassName('txt-rotate');
			for (var i = 0; i < elements.length; i++) {
				var toRotate = elements[i].getAttribute('data-rotate');
				var period = elements[i].getAttribute('data-period');
				if (toRotate) {
					new TxtRotate(elements[i], JSON.parse(toRotate), period);
				}
			}
			// INJECT CSS
			var css = document.createElement('style');
			css.type = 'text/css';
			css.innerHTML = '.txt-rotate > .wrap { border-right: 0em solid #666 ; }';
			document.body.appendChild(css);
		});
		jq(function () {
			jq('#about-link').on('click', function () {
				gsap.to('#navigation-content', 0, { display: 'none', delay: 0.7 });
				gsap.to('#navigation-content', 0, { y: '-100%', delay: 0.7 });
				gsap.to('#header', 0, { display: 'none' });
				gsap.to('#blog', 0, { display: 'none' });
				gsap.to('#portfolio', 0, { display: 'none' });
				gsap.to('#breaker', 0, { display: 'block' });
				gsap.to('#breaker-two', 0, { display: 'block', delay: 0.1 });
				gsap.to('#contact', 0, { display: 'none' });
				gsap.to('#breaker', 0, { display: 'none', delay: 2 });
				gsap.to('#breaker-two', 0, { display: 'none', delay: 2 });
				gsap.to('#about', 0, { display: 'block', delay: 0.7 });
				gsap.to('#navigation-content', 0, { display: 'flex', delay: 2 });
			});
			jq('#contact-link').on('click', function () {
				gsap.to('#navigation-content', 0, { display: 'none', delay: 0.7 });
				gsap.to('#navigation-content', 0, { y: '-100%', delay: 0.7 });
				gsap.to('#header', 0, { display: 'none' });
				gsap.to('#about', 0, { display: 'none' });
				gsap.to('#blog', 0, { display: 'none' });
				gsap.to('#portfolio', 0, { display: 'none' });
				gsap.to('#breaker', 0, { display: 'block' });
				gsap.to('#breaker-two', 0, { display: 'block', delay: 0.1 });
				gsap.to('#breaker', 0, { display: 'none', delay: 2 });
				gsap.to('#breaker-two', 0, { display: 'none', delay: 2 });
				gsap.to('#contact', 0, { display: 'block', delay: 0.7 });
				gsap.to('#navigation-content', 0, { display: 'flex', delay: 2 });
			});
			jq('#profile-link').on('click', function () {
				gsap.to('#navigation-content', 0, { display: 'none', delay: 0.7 });
				gsap.to('#navigation-content', 0, { y: '-100%', delay: 0.7 });
				gsap.to('#header', 0, { display: 'none' });
				gsap.to('#about', 0, { display: 'none' });
				gsap.to('#blog', 0, { display: 'none' });
				gsap.to('#portfolio', 0, { display: 'none' });
				gsap.to('#breaker', 0, { display: 'block' });
				gsap.to('#breaker-two', 0, { display: 'block', delay: 0.1 });
				gsap.to('#breaker', 0, { display: 'none', delay: 2 });
				gsap.to('#breaker-two', 0, { display: 'none', delay: 2 });
				gsap.to('#contact', 0, { display: 'block', delay: 0.7 });
				gsap.to('#navigation-content', 0, { display: 'flex', delay: 2 });
			});
			jq('#portfolio-link').on('click', function () {
				gsap.to('#navigation-content', 0, { display: 'none', delay: 0.7 });
				gsap.to('#navigation-content', 0, { y: '-100%', delay: 0.7 });
				gsap.to('#header', 0, { display: 'none' });
				gsap.to('#about', 0, { display: 'none' });
				gsap.to('#contact', 0, { display: 'none' });
				gsap.to('#blog', 0, { display: 'none' });
				gsap.to('#breaker', 0, { display: 'block' });
				gsap.to('#breaker-two', 0, { display: 'block', delay: 0.1 });
				gsap.to('#breaker', 0, { display: 'none', delay: 2 });
				gsap.to('#breaker-two', 0, { display: 'none', delay: 2 });
				gsap.to('#portfolio', 0, { display: 'block', delay: 0.7 });
				gsap.to('#navigation-content', 0, { display: 'flex', delay: 2 });
			});
			jq('#blog-link').on('click', function () {
				gsap.to('#navigation-content', 0, { display: 'none', delay: 0.7 });
				gsap.to('#navigation-content', 0, { y: '-100%', delay: 0.7 });
				gsap.to('#header', 0, { display: 'none' });
				gsap.to('#about', 0, { display: 'none' });
				gsap.to('#portfolio', 0, { display: 'none' });
				gsap.to('#contact', 0, { display: 'none' });
				gsap.to('#breaker', 0, { display: 'block' });
				gsap.to('#breaker-two', 0, { display: 'block', delay: 0.1 });
				gsap.to('#breaker', 0, { display: 'none', delay: 2 });
				gsap.to('#breaker-two', 0, { display: 'none', delay: 2 });
				gsap.to('#blog', 0, { display: 'block', delay: 0.7 });
				gsap.to('#navigation-content', 0, { display: 'flex', delay: 2 });
			});
		});
		jq(function () {
			var body = document.querySelector('body');
			var jqcursor = jq('.cursor');
			function cursormover(e) {
				gsap.to(jqcursor, {
					x: e.clientX,
					y: e.clientY,
					stagger: 0.002
				});
			}
			function cursorhover(e) {
				gsap.to(jqcursor, {
					scale: 1.4,
					opacity: 1
				});
			}
			function cursor(e) {
				gsap.to(jqcursor, {
					scale: 1,
					opacity: 0.6
				});
			}
			jq(window).on('mousemove', cursormover);
			jq('.menubar').hover(cursorhover, cursor);
			jq('a').hover(cursorhover, cursor);
			jq('.navigation-close').hover(cursorhover, cursor);
		});
	});
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta
		name="description"
		content="The Battle of Computing organized by <br>Dept. of Computer Science and Engineering, BITS Vizag"
	/>
	<title>E-Kshetra</title>
	<!--favicon-img-->
	<link rel="icon" type="image/png" href="/images/e-kshetra.png" />
	<!--favicon-img-->
	<!--main css file should not be removed -->
	<link rel="stylesheet" href="fonts/material-icon/css/material-design-iconic-font.min.css" />

	<!-- Main css -->
	<link rel="stylesheet" href="/css/style.css" />
	<link rel="stylesheet" href="/css/index.css" />
</svelte:head>

<div class={`${$showPopup ? '' : ' tw-hidden'} tw-z-50`}>
	<div
		class=" sm-h:tw-pt-28 tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-80 tw-overflow-y-auto tw-h-full tw-w-full tw-flex tw-items-center tw-justify-center"
		id="my-modal"
	>
		<div class=" tw-w-[80vw] lg:tw-w-[60vw] tw-bg-white tw-rounded-xl tw-p-4 md:tw-text-center">
			<div
				on:click={(_) => showPopup.set(false)}
				class="tw-flex tw-justify-end tw-pb-8 tw-cursor-pointer tw-pointer-events-auto"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="tw-h-6 tw-w-6 tw-text-white tw-bg-main-red"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<p class="md:tw-text-lg">
				After Payment is successfully processed we will get back to you within 3 working
				days for the event registration
			</p>
			<p class="tw-text-lg lg:tw-text-xl tw-text-main-red tw-font-semibold">
				After payment is successfully processed only, please click on Paid Button
			</p>
			<p class="md:tw-text-lg">
				You can contact us from the live chat / whatsapp from our contact us page
			</p>

			<div id="qr-code" class="tw-text-center tw-pt-4">
				{getQr(paymentData.url)}
			</div>

			<a id="upi-link" href={paymentData.url} class="tw-p-4">
				<div
					class="tw-flex tw-items-center tw-justify-around md:tw-justify-center md:tw-text-lg"
				>
					<svg
						id="Layer_1"
						data-name="Layer 1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 849.04 300"
						class="tw-h-10 tw-w-14 md:tw-h-10 md:tw-w-40 md:tw-px-4"
						><defs
							><style>
								.cls-1 {
									fill: #1d1d1b;
								}
								.cls-2 {
									fill: #575756;
								}
							</style></defs
						><title>UPI</title><g id="Group_21635" data-name="Group 21635"
							><path
								id="Path_26930"
								data-name="Path 26930"
								class="cls-1"
								d="M6.72,257.59h6.35l-5.95,25a10.48,10.48,0,0,0,.5,8.25,7.55,7.55,0,0,0,6.75,2.76,12.17,12.17,0,0,0,8.1-2.76,15.48,15.48,0,0,0,4.4-8.24l6-25h6.6l-6,25.35a21.35,21.35,0,0,1-7.05,12.29,20.37,20.37,0,0,1-13.2,4.15,13.22,13.22,0,0,1-11.21-4.05A15,15,0,0,1,.84,283Z"
							/><path
								id="Path_26931"
								data-name="Path 26931"
								class="cls-1"
								d="M38.38,298.24l10-42.24,19.16,25c.5.7,1,1.44,1.55,2.24l1.6,2.7,6.74-28.14h5.95L73.38,300,53.83,274.65l-1.5-2.1a12.73,12.73,0,0,1-1.27-2.46l-6.65,28.05h-6Z"
							/><path
								id="Path_26932"
								data-name="Path 26932"
								class="cls-1"
								d="M83,298.24l9.7-40.65h6.46l-9.71,40.65Z"
							/><path
								id="Path_26933"
								data-name="Path 26933"
								class="cls-1"
								d="M98.63,298.24l9.66-40.65h22.1l-1.3,5.65H113.43l-2.4,10h15.66L125.24,279h-15.8L104.88,298H98.63Z"
							/><path
								id="Path_26934"
								data-name="Path 26934"
								class="cls-1"
								d="M127.89,298.24l9.65-40.65H144l-9.61,40.65Z"
							/><path
								id="Path_26935"
								data-name="Path 26935"
								class="cls-1"
								d="M143.49,298.24l9.7-40.65h22.1l-1.3,5.65H158.34l-2.4,10h15.6l-1.4,5.75h-15.7l-3.1,13.1H167l-1.44,6Z"
							/><path
								id="Path_26936"
								data-name="Path 26936"
								class="cls-1"
								d="M173.09,298.24l9.66-40.65h8.7a51,51,0,0,1,11.7.9,11.82,11.82,0,0,1,8.85,10,24.46,24.46,0,0,1-.5,9.6,31.6,31.6,0,0,1-4,9.55,23.88,23.88,0,0,1-6.9,6.9,19.16,19.16,0,0,1-6.65,2.89,45.05,45.05,0,0,1-10.49.9H173.09Zm7.85-6h5.46a30.49,30.49,0,0,0,6.87-.6,13.35,13.35,0,0,0,4.33-2,17.28,17.28,0,0,0,4.56-5,22.54,22.54,0,0,0,2.7-6.87,18.27,18.27,0,0,0,.49-6.75,9.1,9.1,0,0,0-2.2-5A7.25,7.25,0,0,0,199.6,264a29.59,29.59,0,0,0-7.15-.6h-4.64Z"
							/><path
								id="Path_26937"
								data-name="Path 26937"
								class="cls-1"
								d="M241.15,280l-4.3,18.25h-6l9.65-40.65h10a30.48,30.48,0,0,1,6.25.5,8,8,0,0,1,4.75,5.7,13.64,13.64,0,0,1,0,5.25,16.84,16.84,0,0,1-2.3,5.35,14.11,14.11,0,0,1-3.85,3.85,13.56,13.56,0,0,1-3.95,1.6,33.25,33.25,0,0,1-6.46.5h-3.75Zm1.75-5.45h1.55a16.24,16.24,0,0,0,7.45-1.2,6.13,6.13,0,0,0,2.87-4.25,4.29,4.29,0,0,0-.8-4.5,11.17,11.17,0,0,0-6.7-1.35h-1.6Z"
							/><path
								id="Path_26938"
								data-name="Path 26938"
								class="cls-1"
								d="M283.35,298.24l-2-10.44h-15.7l-7.1,10.45h-6.75L281,256l9.1,42.24Zm-13.9-16h11l-1.81-9.3a13.35,13.35,0,0,1,0-2,21.69,21.69,0,0,1,0-2.55,19.71,19.71,0,0,1-1.3,2.55,18.45,18.45,0,0,1-1.25,2.1Z"
							/><path
								id="Path_26939"
								data-name="Path 26939"
								class="cls-1"
								d="M299.46,298.24l4.4-18.55-8.05-22h6.76l5,13.85a2.12,2.12,0,0,0,.41,1.4c.4.6.3,1.2.49,1.81l1.2-1.81c.41-.6.8-1.08,1.21-1.6l11.85-13.65h6.46L310.26,279.6l-4.39,18.55h-6.41Z"
							/><path
								id="Path_26940"
								data-name="Path 26940"
								class="cls-1"
								d="M360.81,278.19a13,13,0,0,1,.3-2.64c.3-1.45,0-2.1.3-2.9-.4.9-.8,1.81-1.3,2.8a18.8,18.8,0,0,1-1.81,2.85L342.76,300l-5-22.1a21.7,21.7,0,0,0-.5-2.65,20.85,20.85,0,0,1,0-2.5,11,11,0,0,1-.8,2.7,19.82,19.82,0,0,1-1.2,2.95l-9.1,20H320L339.48,256,345,281.65a16.93,16.93,0,0,1,.3,2,24.27,24.27,0,0,0,.55,3.5c.7-1.2,1.6-2.6,2.8-4.4a9.61,9.61,0,0,0,.7-1.09L366.94,256l-.6,42.35h-5.95Z"
							/><path
								id="Path_26941"
								data-name="Path 26941"
								class="cls-1"
								d="M371.52,298.24l9.7-40.65h22l-1.3,5.65h-15.6l-2.45,10h15.54L398.07,279H382.41l-3,13.3h15.66l-1.4,5.95Z"
							/><path
								id="Path_26942"
								data-name="Path 26942"
								class="cls-1"
								d="M401,298.24,411,256l19.16,25c.5.69,1,1.44,1.5,2.24s1.05,1.7,1.65,2.7L440,257.8h6L436,300l-19.55-25.35-1.5-2.1a8.73,8.73,0,0,1-1.25-2.45l-6.75,28.25H401Z"
							/><path
								id="Path_26943"
								data-name="Path 26943"
								class="cls-1"
								d="M466.68,263.14l-8.4,35h-6.45l8.36-35H449.73l1.31-5.65h27.43l-1.35,5.65Z"
							/><path
								id="Path_26944"
								data-name="Path 26944"
								class="cls-1"
								d="M473.44,290l5.75-2.4a5.38,5.38,0,0,0,1.7,4.1,7.08,7.08,0,0,0,4.65,1.45,7.88,7.88,0,0,0,5-1.65,7.3,7.3,0,0,0,2.7-4.34c.6-2.4-.8-4.5-4.25-6.35a6.82,6.82,0,0,0-1.09-.6,18.63,18.63,0,0,1-7.25-5.95,8.7,8.7,0,0,1-.6-6.45,14,14,0,0,1,5.2-7.8,14.93,14.93,0,0,1,9.35-3.15,12.93,12.93,0,0,1,7,1.7,6.83,6.83,0,0,1,2.89,5l-5.65,2.64a6.33,6.33,0,0,0-1.9-2.84,5,5,0,0,0-3.06-.9,7.49,7.49,0,0,0-4.45,1.4,6.69,6.69,0,0,0-2.4,3.74c-.6,2.4,1.09,5,5,6.87l.71.4a16.63,16.63,0,0,1,6.74,5.13,9.13,9.13,0,0,1,.6,6.65,15.76,15.76,0,0,1-5.6,9.3,16.75,16.75,0,0,1-10.4,3.45,11.43,11.43,0,0,1-7.75-2.45A8,8,0,0,1,473.44,290Z"
							/><path
								id="Path_26945"
								data-name="Path 26945"
								class="cls-1"
								d="M520.94,298.24l9.7-40.65h6.45l-9.7,40.65Z"
							/><path
								id="Path_26946"
								data-name="Path 26946"
								class="cls-1"
								d="M536.7,298.24l10-42.24,19.2,25c.5.69,1,1.44,1.5,2.24l1.6,2.7,6.76-28.15h6l-10,42.2-19.6-25.34-1.5-2.1a10,10,0,0,1-1.09-2.56l-6.75,28.25H536.7Z"
							/><path
								id="Path_26947"
								data-name="Path 26947"
								class="cls-1"
								d="M602.35,263.14l-8.35,35h-6.5l8.4-35H585.41l1.31-5.65h27.45l-1.3,5.65Z"
							/><path
								id="Path_26948"
								data-name="Path 26948"
								class="cls-1"
								d="M609.5,298.24l9.71-40.65h22.2l-1.3,5.65h-15.6l-2.45,10h15.65l-1.4,5.75H620.66l-3.1,13.1h15.6l-1.4,6Z"
							/><path
								id="Path_26949"
								data-name="Path 26949"
								class="cls-1"
								d="M649.16,280l-4.34,18.15h-6.06l9.7-40.65h9a29.08,29.08,0,0,1,6,.5,6.59,6.59,0,0,1,3.3,1.75,6.93,6.93,0,0,1,1.9,3.8,11.4,11.4,0,0,1,0,5,15.09,15.09,0,0,1-4.1,7.7,14,14,0,0,1-7.59,3.3l9.2,18.43h-7.26l-9-18Zm1.6-5H652a14.51,14.51,0,0,0,7.06-1.2,6.45,6.45,0,0,0,2.7-4.34c.5-2.2.3-3.79-.7-4.69a9.76,9.76,0,0,0-6.36-1.45h-1.2Z"
							/><path
								id="Path_26950"
								data-name="Path 26950"
								class="cls-1"
								d="M669.87,298.24l9.65-40.65h22.1l-1.3,5.65h-15.8l-2.4,10h15.65L696.33,279H680.72L676.17,298h-6.45Z"
							/><path
								id="Path_26951"
								data-name="Path 26951"
								class="cls-1"
								d="M723.12,298.24l-2-10.44H705.37l-7.06,10.45h-6.79L720.82,256l9,42.24Zm-14-16h11l-1.81-9.3a11.13,11.13,0,0,1,0-2,21.69,21.69,0,0,1,0-2.55,55.38,55.38,0,0,1-2.5,4.65Z"
							/><path
								id="Path_26952"
								data-name="Path 26952"
								class="cls-1"
								d="M771.83,267.5a13.36,13.36,0,0,0-5-3.55,14.87,14.87,0,0,0-6.2-1.2A17.66,17.66,0,0,0,749,267a19.92,19.92,0,0,0-6.75,11.1,13.09,13.09,0,0,0,1.44,10.9,10,10,0,0,0,8.95,4.24,19,19,0,0,0,7-1.34,29.08,29.08,0,0,0,7.1-3.8l-1.85,7.45a22.75,22.75,0,0,1-6.36,2.8,26,26,0,0,1-6.86.95,20,20,0,0,1-8-1.57,14.37,14.37,0,0,1-5.79-4.5,14.75,14.75,0,0,1-2.8-6.9,20.6,20.6,0,0,1,.5-8.45,27.09,27.09,0,0,1,3.55-8.4,29.13,29.13,0,0,1,14-11.42,25.48,25.48,0,0,1,8.6-1.5,19.63,19.63,0,0,1,6.45,1,17.84,17.84,0,0,1,5.35,3.15Z"
							/><path
								id="Path_26953"
								data-name="Path 26953"
								class="cls-1"
								d="M772.48,298.24l9.65-40.65h22.1l-1.3,5.65H787.28l-2.4,10h15.6l-1.4,5.75H783.43l-3.1,13.1H796l-1.45,6.15Z"
							/><path
								id="Path_26954"
								data-name="Path 26954"
								class="cls-1"
								d="M655,222.19H610.7L672.26,0h44.31Z"
							/><path
								id="Path_26955"
								data-name="Path 26955"
								class="cls-1"
								d="M632,7A16.21,16.21,0,0,0,617.81.6H374.47l-12,43.55H583.85L571,90.65H349.47L312.76,223.3h44.31l24.6-89h199A28,28,0,0,0,598.25,128a29.48,29.48,0,0,0,10.8-15.75l24.61-89A17.92,17.92,0,0,0,632,7Z"
							/><path
								id="Path_26956"
								data-name="Path 26956"
								class="cls-1"
								d="M287,208.3a20.35,20.35,0,0,1-19.55,15H39.08A15.93,15.93,0,0,1,25.17,217a17.24,17.24,0,0,1-1.9-15.71L78.93.6h44.31L73.48,180H250.65L300.66.85h43.79Z"
							/><path
								id="Path_26957"
								data-name="Path 26957"
								class="cls-2"
								d="M793,.4l56,111.35L731.27,223.1Z"
							/><path
								id="Path_26958"
								data-name="Path 26958"
								class="cls-1"
								d="M753.68.4l56,111.35L691.87,223.1Z"
							/></g
						></svg
					>
					<p class=" tw-underline tw-text-black ">For UPI Payments Click Here</p>
				</div>
			</a>

			<div class="tw-flex tw-justify-center">
				<button
					on:click={(_) => paymentDone()}
					class="tw-bg-green-600 tw-text-white tw-border-none tw-py-2 tw-px-6 md:tw-text-xl tw-rounded-lg hover:tw-bg-opacity-80"
					>Paid</button
				>
			</div>
		</div>
	</div>
</div>

<div id="navigation-content">
	<div class="navigation-close">
		<span class="close-first" />
		<span class="close-second" />
	</div>
	<div class="navigation-links">
		<a href="/profile" data-text="PROFILE" id="profile-link">PROFILE</a>
		<a href="/about" data-text="ABOUT" id="about-link">ABOUT</a>
		<a href="/events" data-text="E-KSHETRA" id="portfolio-link">E-KSHETRA</a>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="#" data-text="CART" id="blog-link">CART</a>
		<a href="/sponsor" data-text="SPONSORS" id="sponsor-link">SPONSORS</a>
		<a href="/gallery" data-text="GALLERY" id="gallery-link">GALLERY</a>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="/contact" data-text="CONTACT" id="contact-link">CONTACT US</a>
	</div>
</div>

<div class="">
	<div id="navigation-bar">
		<div class="menubar">
			<span class="first-span" />
			<span class="second-span" />
			<span class="third-span" />
		</div>
	</div>
</div>

{#if $isLoading === true}
	<div
		class="tw-fixed tw-bg-white tw-bg-opacity-60 tw-z-10 tw-h-full tw-w-full tw-flex tw-items-center tw-justify-center "
	>
		<div class="tw-flex tw-items-center">
			<span class="tw-text-3xl tw-mr-4">Loading</span>
			<!-- loading icon -->
			<svg
				class="tw-animate-spin tw-h-5 tw-w-5 tw-text-gray-600"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle
					class="tw-opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
				/>
				<path
					class="tw-opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
			<!-- end loading icon -->
		</div>
	</div>
{/if}

<div
	id="cart"
	class=" tw-bg-black tw-min-h-[100vh] tw-min-w-[100vw] tw-flex tw-flex-col tw-items-center sm:tw-px-4 tw-py-8"
>
	<div class="tw-w-[100%] lg:tw-w-[70%] xl:tw-w-[50%]">
		<div class="tw-p-4 tw-text-black tw-text-2xl">
			<!-- Payments will be opened shortly -->
			{#each events as event, i}
				<div class="tw-bg-slate-50 tw-rounded-lg tw-m-6">
					<div class="tw-flex tw-p-4 tw-justify-between">
						<div>
							<h1 class=" tw-text-base sm:tw-text-xl">
								{event.name}
							</h1>
							<ul class="tw-pl-8">
								<li>
									{event.members
										? 'Min ' + event.members + ' Persons'
										: 'No Limit'}
								</li>
								<li>Price is Rs. {event.price} Team</li>
							</ul>
						</div>
						<div class="tw-flex tw-items-center">
							<div>
								<input
									on:click={(_) => updateClick(i)}
									type="checkbox"
									name="poster"
									id="poster"
								/>
							</div>
						</div>
					</div>

					{#if $eventStores[i] === true}
						<div class="tw-p-4">
							{#if event.members !== null}
								<h1 class="tw-text-sm sm:tw-text-lg tw-font-semibold">
									Enter your team UID to register
								</h1>
							{/if}
							<input
								class="tw-p-2 tw-m-4 tw-w-[90%] sm:tw-w-[60%] tw-border-solid tw-border-2 tw-rounded-lg tw-border-gray-900 tw-cursor-not-allowed tw-pointer-events-none"
								type="text"
								name=""
								id={getIDName(event, 1)}
								placeholder="Enter First user UID"
								value={$user.id}
								required
							/>

							{#if event.members !== null}
								{#each Array(event.members - 1) as _, i}
									<input
										class="tw-p-2 tw-m-4 tw-w-[90%] sm:tw-w-[60%] tw-border-solid tw-border-2 tw-rounded-lg tw-border-gray-900"
										type="text"
										name=""
										id={getIDName(event, i + 2)}
										placeholder={`Enter ${Map[i + 2]} user UID`}
										value=""
									/>
								{/each}
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
		<div class=" tw-border-[0.5px] tw-border-gray tw-border-solid" />

		<div class="tw-flex tw-justify-between tw-py-8 tw-px-12">
			<span class="tw-text-xl tw-text-gray-500 tw-px-8">Total: </span>
			<p class="tw-text-2xl tw-text-white tw-px-8">Rs. {totalPrice}</p>
		</div>

		<div class="tw-flex tw-justify-center tw-py-8 tw-px-12">
			<button
				on:click={(_) => createAndHandleLink()}
				class={`tw-py-4 tw-px-10 tw-rounded-xl tw-pointer-events-auto tw-cursor-auto hover:tw-opacity-70 focus:tw-border-2 focus:tw-border-solid tw-bg-main-red tw-border-none tw-text-white tw-font-bold tw-text-lg ${
					$showPopup ? 'tw-hidden' : ''
				}`}>Pay Now</button
			>
		</div>
	</div>
</div>
