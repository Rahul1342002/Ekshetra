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
	async function getEvents(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const options = {
					method: 'POST',
					body: JSON.stringify({
						user: id
					})
				};
				const res = await fetch('/api/getEventUsersFromId', options);
				const json = await res.json();
				resolve(json);
			} catch (err) {
				reject(err);
			}
		});
	}

	var load = false;
	isLoading.subscribe((value) => {
		load = value;
	});

	var eventData = {
		result: []
	};

	(async () => {
		try {
			isLoading.set(!load);
			const res = await getEvents($user.id);
			isLoading.set(!load);
			if (res?.error) {
				alert(res.message);
			} else if (!res?.error) {
				eventData = res;
			} else {
				alert('something went wrong');
			}
			console.log(eventData);
		} catch (err) {
			console.log(err);
		} finally {
			// @ts-ignore
			if (load === true) {
				isLoading.set(!load);
			}
		}
	})();

	function copyValue() {
		// @ts-ignore
		Clipboard.copy($user.id);
		alert('Copied to clipboard');
	}

	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import jQuery from 'jquery';
	import { currentEvent, isLoading, user } from '../../stores';

	function handleClick(event) {
		if ($currentEvent === event.id) {
			currentEvent.set('0');
		} else {
			currentEvent.set(event.id);
		}
	}

	onMount(() => {
		// @ts-ignore
		window.Clipboard = (function (window, document, navigator) {
			var textArea, copy;

			function isOS() {
				return navigator.userAgent.match(/ipad|iphone/i);
			}

			function createTextArea(text) {
				textArea = document.createElement('textArea');
				// @ts-ignore
				textArea.value = text;
				document.body.appendChild(textArea);
			}

			function selectText() {
				var range, selection;

				if (isOS()) {
					range = document.createRange();
					range.selectNodeContents(textArea);
					selection = window.getSelection();
					selection.removeAllRanges();
					selection.addRange(range);
					textArea.setSelectionRange(0, 999999);
				} else {
					textArea.select();
				}
			}

			function copyToClipboard() {
				document.execCommand('copy');
				document.body.removeChild(textArea);
			}

			copy = function (text) {
				createTextArea(text);
				selectText();
				copyToClipboard();
			};

			return {
				copy: copy
			};
		})(window, document, navigator);

		const jq = jQuery;

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

<div id="navigation-content">
	<div class="navigation-close">
		<span class="close-first" />
		<span class="close-second" />
	</div>
	<div class="navigation-links">
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="#" data-text="PROFILE" id="profile-link">PROFILE</a>
		<a href="/about" data-text="ABOUT" id="about-link">ABOUT</a>
		<a href="/events" data-text="E-KSHETRA" id="portfolio-link">E-KSHETRA</a>
		<a href="/cart" data-text="CART" id="blog-link">CART</a>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="/sponsor" data-text="SPONSORS" id="sponsor-link">SPONSORS</a>
			<a href="/gallery" data-text="GALLERY" id="gallery-link">GALLERY</a>
		<a href="/contact" data-text="CONTACT" id="contact-link">CONTACT US</a>
	</div>
</div>

<div class=" tw-min-h-[100vh]">
	<div class=" tw-pb-16">
		<div id="navigation-bar">
			<div class="menubar">
				<span class="first-span" />
				<span class="second-span" />
				<span class="third-span" />
			</div>
		</div>
	</div>

	<div class="tw-rounded-xl">
		<div class="tw-px-8">
			<div class="tw-flex">
				<h1
					class=" tw-text-sm sm:tw-text-lg md:tw-text-xl tw-text-white tw-font-semibold tw-pr-4 tw-flex"
				>
					<span class="tw-pr-4 tw-text-gray-400">UID: </span>{$user.id}
				</h1>
				<button
					on:click={(_) => copyValue()}
					class="tw-border-none tw-rounded-md tw-bg-black hover:tw-bg-white tw-cursor-pointer tw-pointer-events-auto"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						class="tw-h-5 tw-w-5 sm:tw-h-6 sm:tw-w-6 md:tw-w-8 md:tw-h-8 tw-text-white hover:tw-text-black"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
						/>
					</svg>
				</button>
			</div>
			<div>
				<h3 class="tw-text-gray-300 tw-text-xs sm:tw-text-sm md:tw-text-base lg:tw-text-xl">
					{$user.email}
				</h3>
			</div>
		</div>
		<div class="tw-py-4">
			<div class=" tw-border-[0.5px] tw-border-gray-400 tw-border-solid" />
		</div>
	</div>

	{#if $isLoading === true}
		<div
			class="tw-absolute tw-bg-white tw-bg-opacity-60 tw-z-10 tw-h-full tw-w-full tw-flex tw-items-center tw-justify-center"
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
	{:else}
		<div class="tw-text-gray-300 tw-text-center md:tw-text-xl ">
			{#if eventData?.result?.length === 0}
				<p>There are no events to show</p>
				<p>You can go to cart and enroll into any event</p>
			{:else}
				{#each eventData.result as events}
					{#each events.data as event}
						<div on:click={(_) => handleClick(event)} class="tw-flex tw-justify-center">
							<div class="tw-py-4">
								<div
									class="tw-text-black tw-bg-white tw-rounded-lg tw-p-4 tw-min-w-[90vw] md:tw-min-w-[50vw] tw-flex tw-flex-col tw-items-start"
								>
									<p>
										<span class="tw-text-gray-400 tw-font-semibold"
											>Event ID:
										</span>
										<span class="tw-font-bold tw-text-base">{event.id}</span>
									</p>
									<p>
										<span class="tw-text-gray-400 tw-font-semibold"
											>Event Name:
										</span>
										<span class="tw-font-bold tw-text-base">{event.name}</span>
									</p>
									<p
										class={`tw-text-xs tw-underline ${
											$currentEvent === event.id
												? ' tw-opacity-0 tw-h-0'
												: 'tw-opacity-100 tw-h-auto'
										}`}
									>
										Click to know about registered users
									</p>

									<div
										class={`${
											$currentEvent === event.id
												? 'tw-opacity-100 tw-pointer-events-auto tw-cursor-auto tw-h-auto'
												: 'tw-opacity-0 tw-pointer-events-none tw-cursor-none tw-h-0'
										}`}
									>
										<p class=" tw-underline tw-pt-4 tw-pb-2">
											Registered Users
										</p>
										{#each event.users as user}
											<div class=" tw-flex">
												<p>{user.name} - {user.email}</p>
											</div>
										{/each}
									</div>
								</div>
							</div>
						</div>
					{/each}
				{/each}
			{/if}
		</div>
	{/if}
</div>
