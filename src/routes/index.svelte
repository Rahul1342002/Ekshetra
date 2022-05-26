<script>
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import jQuery from 'jquery';
	// import Particles from 'svelte-particles';
	let particlesConfig = {
		particles: {
			color: {
				value: '#000'
			},
			links: {
				enable: true,
				color: '#000'
			},
			move: {
				enable: true
			}
		}
	};
	let ParticlesComponent;
	onMount(async () => {
		// const module = await import('svelte-particles');

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
			jq('#home-link').on('click', function () {
				gsap.to('#navigation-content', 0, { display: 'none', delay: 0.7 });
				gsap.to('#navigation-content', 0, { y: '-100%', delay: 0.7 });
				gsap.to('#header', 0, { display: 'none' });
				gsap.to('#about', 0, { display: 'none' });
				gsap.to('#portfolio', 0, { display: 'none' });
				gsap.to('#contact', 0, { display: 'none' });
				gsap.to('#blog', 0, { display: 'none' });
				gsap.to('#breaker', 0, { display: 'block' });
				gsap.to('#breaker-two', 0, { display: 'block', delay: 0.1 });
				gsap.to('#breaker', 0, { display: 'none', delay: 2 });
				gsap.to('#breaker-two', 0, { display: 'none', delay: 2 });
				gsap.to('#header', 0, { display: 'block', delay: 0.7 });
				gsap.to('#navigation-content', 0, { display: 'flex', delay: 2 });
			});
		});
		jq(function () {
			var body = document.querySelector('body');
			var jqcursor = jq('.cursor');
			if (jqcursor) {
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
			}
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
	<style>
		.ab {
			color: #000;
			text-align: center;
		}
		.ek2 {
			height: 250px;
			width: auto;
		}
		.imag1 {
			height: 60px;
			width: auto;
		}
		.ima1g {
			height: 300px;
			width: auto;
		}
		.imag2 {
			height: 40px;
			width: auto;
		}
		.font1 {
			font-size: 25px;
		}

		.color1 {
			color: #c70039;
			font-size: 25px;
		}
		.about_ekshetra {
			margin-left: 20px;
			font-size: 20px;
			font-family: Garamond, serif;
		}
		.card {
			width: 90%;
			margin-left: auto;
			margin-right: auto;
			float: none;
			padding: 20px;
			background: #fff;
			color: #000;
			border-radius: 20px 20px 0px 0px;
		}

		.card1 {
			width: 90%;
			margin-left: auto;
			margin-right: auto;
			float: none;
			padding: 20px;
			background: #fff;
			color: #000;
			border-radius: 0 0 20px 20px;
		}

		.container1 {
			padding: 2px 16px;
		}
		.card1 {
			width: 90%;
			margin-left: auto;
			margin-right: auto;
			float: none;
			padding: 20px;
			background: #fff;
			color: #000;
			border-radius: 0 0 20px 20px;
		}

		.container2 {
			padding: 2px 16px;
		}
		.card2 {
			width: 90%;
			margin-left: auto;
			margin-right: auto;
			float: none;
			padding: 20px;
			background: #fff;
			color: #000;
			border-radius: 20px 20px 20px 20px;
		}
	</style>
</svelte:head>

<div class="tw-max-h-[100vh]">
	<a href="/gallery">
		<div
			class="tw-fixed tw-bottom-6 tw-z-50 tw-bg-white hover:tw-bg-opacity-50 tw-p-2 lg:tw-p-4 tw-text-center tw-rounded-full tw-flex tw-justify-center tw-right-6"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="tw-h-6 tw-w-6 tw-text-black"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
		</div>
	</a>

	<!--mouse  follower-->
	<div class="cursor tw-hidden md:tw-block" />
	<!--mouse  follower-->
	<!--loader-->
	<div id="loader">
		<img class="ima1g" src="/images/eki.png" alt="logo" />
	</div>
	<!--loader-end-->
	<!--link-screen-->
	<!-- <div id="breaker">
    </div>
    <div id="breaker-two">
    </div> -->
	<!--link-screen-->
	<!--Main-Section-->
	<!--Navigator-fullscreen-->
	<div id="navigation-content">
		<div class="navigation-close">
			<span class="close-first" />
			<span class="close-second" />
		</div>
		<div class="navigation-links">
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#" data-text="HOME" id="home-link">HOME</a>
			<a href="/about" data-text="ABOUT" id="about-link">ABOUT</a>
			<a href="/events" data-text="E-KSHETRA" id="portfolio-link">E-KSHETRA</a>
			<a href="/register" data-text="REGISTRATION" id="blog-link">REGISTRATION</a>
			<a href="/sponsor" data-text="SPONSORS" id="sponsor-link">SPONSORS</a>
			<a href="/gallery" data-text="GALLERY" id="gallery-link">GALLERY</a>
			<a href="/contact" data-text="CONTACT" id="contact-link">CONTACT US</a>
		</div>
	</div>
	<!--Navigator-Fullscreen END-->
	<!--Home Page-->
	<!--Menubar-->
	<div id="navigation-bar">
		<div class="menubar">
			<span class="first-span" />
			<span class="second-span" />
			<span class="third-span" />
		</div>
	</div>
	<!--home content-->
	<div id="header">
		<div id="particles" />
		<!--Social Media Links-->
		<div class="social-media-links">
			<a href="https://instagram.com/bits_vizag_official?utm_medium=copy_link"
				><img
					src="images/instagram logo.png"
					class="social-media"
					alt="instagram-logo"
				/></a
			><!--Your instagram homepage link inser in place of "#"-->
			<a href="https://www.facebook.com/BITSVizagOfficial/?ti=as"
				><img src="images/facebook logo.png" class="social-media" alt="facebook-logo" /></a
			>

			<img class="imag1" src="images/CSE Logo.png" alt="logo" />
		</div>
		<!--Social Media Links end-->
		<div class="header-content" id="he">
			<div class="header-content-box">
				<div class="firstline">
					<div class="sm-h:tw-pt-72 md-h:tw-pt-48">
						<img
							class="ek2 tw-h-[200px] md:tw-h-[230px]"
							src="images/both.png"
							alt="logo"
						/>
						<span
							><h4
								class="hii maintain-font tw-text-base sm:tw-text-lg md:tw-text-2xl lg:tw-text-2xl tw-p-4"
								style="color:white;"
							>
								The Battle of Computing organized by <br />Dept. of CSE, BITS Vizag
								on 28th ,29th and 30th April
							</h4></span
						>
					</div>
				</div>
				<div
					class="secondline tw-text-base sm:tw-text-lg md:tw-text2xl lg:tw-text-4xl tw-p-4"
				>
					Experience
					<!-- prettier-ignore -->
					<span
					class="txt-rotate color"
					data-period="1200"
					data-rotate='[ "Fun", " Fabulous", " Lively" ]'
				/>
					<span class="slash">|</span>
					Event by CSE, BITS Vizag.
				</div>
				<div class="contact">
					<img class="imag2" src="images/Square Logo.png" alt="logo" />
					<a href="Mailto:info.ekshetra@gmail.com"
						><img src="images/mail.png" alt="email-pic" class="contactpic" /></a
					><!--Your email Id write in place of "#"-->
					<a href="Tel:8297293834"
						><img src="images/call.png" alt="phone-pic" class="contactpic" /></a
					><!--Your telephone number Id write in place of "#"-->
				</div>
			</div>
		</div>
		<div
			class="tw-fixed tw-py-16 sm:tw-flex sm:tw-justify-center sm:tw-items-center sm:tw-flex-col tw-min-w-[100vw]"
		>
			<p
				class="tw-text-white tw-p-4 tw-text-base sm:tw-text-lg md:tw-text2xl lg:tw-text-4xl "
			>
				Premium Partners
			</p>
			<div
				class="tw-flex tw-overflow-x-hidden tw-min-w-[120rem] sm:tw-min-w-[100vw] sm:tw-justify-center"
			>
				<div class=" tw-animate-marquee tw-whitespace-nowrap sm:tw-animate-none  ">
					<img
						class="tw-mx-4 tw-h-14 tw-w-14 sm:tw-h-20 sm:tw-w-20 md:tw-h-30 md:tw-w-30 lg:tw-h-50 lg:tw-w-50"
						src="/sponsor/chegg1.png"
						alt=""
					/>
					<img
						class="tw-mx-4 tw-h-14 tw-w-14 sm:tw-h-20 sm:tw-w-20 md:tw-h-30 md:tw-w-30 lg:tw-h-50 lg:tw-w-50"
						src="/sponsor/radison.png"
						alt=""
					/>
					<img
						class="tw-mx-4 tw-h-14 tw-w-14 sm:tw-h-20 sm:tw-w-20 md:tw-h-30 md:tw-w-30 lg:tw-h-50 lg:tw-w-50"
						src="/sponsor/7to9.png"
						alt=""
					/>
					<img
						class="tw-mx-4 tw-h-14 tw-w-14 sm:tw-h-20 sm:tw-w-20 md:tw-h-30 md:tw-w-30 lg:tw-h-50 lg:tw-w-50"
						src="/sponsor/MG.png"
						alt=""
					/>
					<img
						class="tw-mx-4 tw-h-14 tw-w-14 sm:tw-h-20 sm:tw-w-20 md:tw-h-30 md:tw-w-30 lg:tw-h-50 lg:tw-w-50"
						src="/sponsor/LEO GLOBAL.png"
						alt=""
					/>
					<img
						class="tw-mx-4 tw-h-14 tw-w-14 sm:tw-h-20 sm:tw-w-20 md:tw-h-30 md:tw-w-30 lg:tw-h-50 lg:tw-w-50"
						src="/sponsor/HONEY.png"
						alt=""
					/>
				</div>

				<div class="tw-absolute tw-animate-marquee2 tw-whitespace-nowrap sm:tw-hidden">
					<img
						class="tw-mx-4 tw-h-14 tw-w-14 sm:tw-h-20 sm:tw-w-20 md:tw-h-30 md:tw-w-30 lg:tw-h-50 lg:tw-w-50"
						src="/sponsor/chegg1.png"
						alt=""
					/>
					<img
						class="tw-mx-4 tw-h-14 tw-w-14 sm:tw-h-20 sm:tw-w-20 md:tw-h-30 md:tw-w-30 lg:tw-h-50 lg:tw-w-50"
						src="/sponsor/radison.png"
						alt=""
					/>
					<img
						class="tw-mx-4 tw-h-14 tw-w-14 sm:tw-h-20 sm:tw-w-20 md:tw-h-30 md:tw-w-30 lg:tw-h-50 lg:tw-w-50"
						src="/sponsor/7to9.png"
						alt=""
					/>
					<img
						class="tw-mx-4 tw-h-14 tw-w-14 sm:tw-h-20 sm:tw-w-20 md:tw-h-30 md:tw-w-30 lg:tw-h-50 lg:tw-w-50"
						src="/sponsor/MG.png"
						alt=""
					/>
					<img
						class="tw-mx-4 tw-h-14 tw-w-14 sm:tw-h-20 sm:tw-w-20 md:tw-h-30 md:tw-w-30 lg:tw-h-50 lg:tw-w-50"
						src="/sponsor/LEO GLOBAL.png"
						alt=""
					/>
					<img
						class="tw-mx-4 tw-h-14 tw-w-14 sm:tw-h-20 sm:tw-w-20 md:tw-h-30 md:tw-w-30 lg:tw-h-50 lg:tw-w-50"
						src="/sponsor/HONEY.png"
						alt=""
					/>
				</div>
			</div>
		</div>

		<!--header image-->
		<!--header image end-->
	</div>
</div>
