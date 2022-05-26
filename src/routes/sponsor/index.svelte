<script>
	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import jQuery from 'jquery';
	onMount(() => {
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
	<link rel="icon" type="image/png" href="images/e-kshetra.png" />
	<!--favicon-img-->
	<!--main css file should not be removed -->
	<link rel="stylesheet" href="fonts/material-icon/css/material-design-iconic-font.min.css" />

	<!-- Main css -->
	<link rel="stylesheet" href="/css/style.css" />
	<link rel="stylesheet" href="/css/index.css" />
</svelte:head>

<!--link-screen-->
<!--Main-Section-->
<!--Navigator-fullscreen-->
<div id="navigation-content">
	<div class="navigation-close">
		<span class="close-first" />
		<span class="close-second" />
	</div>
	<div class="navigation-links">
		<a href="/" data-text="HOME" id="home-link">HOME</a>
		<a href="/about" data-text="ABOUT" id="about-link">ABOUT</a>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="#" data-text="E-KSHETRA" id="portfolio-link">E-KSHETRA</a>
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

<div class="tw-flex tw-justify-center tw-items-center tw-py-20">
	<div class="tw-w-full lg:tw-w-[50vw] sm:tw-w-[70vw]">
		<div class="tw-overflow-hidden tw-rounded-lg tw-shadow-xl tw-shadow-neutral-400">
			<div class="tw-bg-white tw-p-8 tw-flex tw-flex-col tw-items-center tw-rounded-lg">
				<div class="tw-text-center">
					<p
						class="tw-py-4  tw-font-bold tw-text-transparent tw-text-4xl tw-bg-clip-text tw-bg-gradient-to-r tw-from-rose-400 tw-via-fuchsia-500 tw-to-indigo-500"
					>
						Channel Partner
					</p>
				</div>
				<div class="tw-py-4">
					<img
						src="/sponsor/krexhe.png"
						alt=""
						class="tw-block tw-h-[150px] tw-w-[150px] lg:tw-h-[200px] lg:tw-w-[200px]"
					/>
				</div>

				<div class="tw-text-center">
					<p class="tw-text-lg tw-font-bold">Krexhe</p>
				</div>

				<footer
					class="tw-flex tw-items-center tw-justify-between tw-leading-none tw-p-2 md:tw-p-4"
				>
					<p class="tw-text-sm p-4">
						Krexhe provides safe and affordable means to increase productivity and
						overall growth amongst businesses by collaborating with each other. A social
						communal platform for businesses of all scales and sizes. Krexhe was built
						in view of the various issues that pertain to managing human resources,
						physical resources and projects outsourcing. Mentioned below are the major
						aspects we deal with.
					</p>
				</footer>
			</div>
		</div>
	</div>
</div>

<div class="max-w-[100vw]">
	<div
		class="tw-container tw-my-12 tw-mx-auto tw-px-4 md:tw-px-12 tw-bg-white tw-p-4 tw-rounded-lg"
	>
		<p
			class="tw-text-center tw-font-bold tw-text-transparent tw-text-4xl tw-bg-clip-text tw-bg-gradient-to-l tw-from-blue-700 tw-via-blue-800 tw-to-gray-900 tw-pb-4"
		>
			Premium sponsors
		</p>
		<div class="tw-flex tw-flex-wrap -tw-mx-1 lg:-tw-mx-4">
			<div class="tw-my-1 tw-p-4 tw-w-full md:tw-w-1/2 lg:tw-my-4 lg:tw-px-4 lg:tw-w-1/3 ">
				<article
					class="tw-overflow-hidden tw-rounded-lg tw-shadow-lg tw-shadow-neutral-400"
				>
					<div class="tw-flex tw-justify-center">
						<img
							alt="Placeholder"
							class="tw-block tw-h-[150px] tw-w-[150px] lg:tw-h-[200px] lg:tw-w-[200px]"
							src="/sponsor/chegg1.png"
						/>
					</div>

					<header
						class="tw-flex tw-items-center tw-justify-center tw-leading-tight tw-p-2 md:tw-p-4"
					>
						<h1 class="tw-text-lg">Chegg</h1>
					</header>

					<footer
						class="tw-flex tw-items-center tw-justify-between tw-leading-none tw-p-2 md:tw-p-4"
					>
						<p class="tw-text-sm p-4">
							Chegg, Inc., is an American education technology company based in Santa
							Clara, California. It provides digital and physical textbook rentals,
							textbooks, online tutoring, and other student services. The company was
							launched in 2005, and began trading publicly on the New York Stock
							Exchange in November 2013.
						</p>
					</footer>
				</article>
			</div>

			<div class="tw-my-1 tw-p-4 tw-w-full md:tw-w-1/2 lg:tw-my-4 lg:tw-px-4 lg:tw-w-1/3">
				<article
					class="tw-overflow-hidden tw-rounded-lg tw-shadow-lg backdrop-blur-xl tw-shadow-neutral-400"
				>
					<div class="tw-flex tw-justify-center">
						<img
							alt="Placeholder"
							class="tw-block tw-h-[150px] tw-w-[150px] lg:tw-h-[200px] lg:tw-w-[200px]"
							src="/sponsor/radison.png"
						/>
					</div>

					<header
						class="tw-flex tw-items-center tw-justify-center tw-leading-tight tw-p-2 md:tw-p-4"
					>
						<h1 class="tw-text-lg">Radission Blu</h1>
					</header>

					<footer
						class="tw-flex tw-items-center tw-justify-between tw-leading-none tw-p-2 md:tw-p-4"
					>
						<p class="tw-text-sm p-4">
							Radisson Hotels & Resorts is one of the leading, full-service global
							hotel companies. It has its business over 420 locations in 73 countries.
							They are passionate about “Yes I Can!” service philosophy which
							empowering the employees to make sure that they are entirely satisfied
							for the duration of the stay. This is a major international hotel
							company.
						</p>
					</footer>
				</article>
			</div>

			<div class="tw-my-1 tw-p-4 tw-w-full md:tw-w-1/2 lg:tw-my-4 lg:tw-px-4 lg:tw-w-1/3">
				<article
					class="tw-overflow-hidden tw-rounded-lg tw-shadow-lg backdrop-blur-xl tw-shadow-neutral-400"
				>
					<div class="tw-flex tw-justify-center">
						<img
							alt="Placeholder"
							class="tw-block tw-h-[150px] tw-w-[150px] lg:tw-h-[200px] lg:tw-w-[200px]"
							src="/sponsor/MG.png"
						/>
					</div>

					<header
						class="tw-flex tw-items-center tw-justify-center tw-leading-tight tw-p-2 md:tw-p-4"
					>
						<h1 class="tw-text-lg">Morris Garrages</h1>
					</header>

					<footer
						class="tw-flex tw-items-center tw-justify-between tw-leading-none tw-p-2 md:tw-p-4"
					>
						<p class="tw-text-sm p-4">
							MG Hector is best. With great features, build quality, customer service,
							and reliability, the MG Hector has proven to be a great SUV to buy in
							its segment. Now, with the launch of the 2021 model, the Hector is set
							to welcome even more customers to the happy MG Family. MG HECTOR the
							best car of the decade.
						</p>
					</footer>
				</article>
			</div>

			<div class="tw-my-1 tw-p-4 tw-w-full md:tw-w-1/2 lg:tw-my-4 lg:tw-px-4 lg:tw-w-1/3">
				<article
					class="tw-overflow-hidden tw-rounded-lg tw-shadow-lg backdrop-blur-xl tw-shadow-neutral-400"
				>
					<div class="tw-flex tw-justify-center">
						<img
							alt="Placeholder"
							class="tw-block tw-h-[150px] tw-w-[150px] lg:tw-h-[200px] lg:tw-w-[200px]"
							src="/sponsor/HONEY.png"
						/>
					</div>

					<header
						class="tw-flex tw-items-center tw-justify-center tw-leading-tight tw-p-2 md:tw-p-4"
					>
						<h1 class="tw-text-lg">The Honeyy Group</h1>
					</header>

					<footer
						class="tw-flex tw-items-center tw-justify-between tw-leading-none tw-p-2 md:tw-p-4"
					>
						<p class="tw-text-sm p-4">
							HONEYY GROUP is a closely knit family of reliable employees,
							well-qualified Civil Engineers and experienced corporate professionals
							who have taken upon themselves to create state-of-the-art infrastructure
							for developing the prestigious projects.Honeyy Constructions is our
							Construction wing undertaking projects that include affordable housing
							projects as well as luxury residences.
						</p>
					</footer>
				</article>
			</div>

			<div class="tw-my-1 tw-p-4 tw-w-full md:tw-w-1/2 lg:tw-my-4 lg:tw-px-4 lg:tw-w-1/3">
				<article
					class="tw-overflow-hidden tw-rounded-lg tw-shadow-lg backdrop-blur-xl tw-shadow-neutral-400"
				>
					<div class="tw-flex tw-justify-center">
						<img
							alt="Placeholder"
							class="tw-block tw-h-[150px] tw-w-[150px] lg:tw-h-[200px] lg:tw-w-[200px]"
							src="/sponsor/7to9.png"
						/>
					</div>

					<header
						class="tw-flex tw-items-center tw-justify-center tw-leading-tight tw-p-2 md:tw-p-4"
					>
						<h1 class="tw-text-lg">7To9 Foods</h1>
					</header>

					<footer
						class="tw-flex tw-items-center tw-justify-between tw-leading-none tw-p-2 md:tw-p-4"
					>
						<p class="tw-text-sm p-4">
							7To9 Foods offers Pure Vegetarian - South Indian, North Indian and
							Chinese cuisine options for dine-in and takeaway, Indian dishes comprise
							Dosa, Paneer, Naan, Chapati, Biryani, and more. We also have western
							foods like noodles, pasta, burger, fries, and pizza. It is the famous
							Vegetarian restaurant located in Chinna Waltair,Visakhapatnam.
						</p>
					</footer>
				</article>
			</div>

			<div class="tw-my-1 tw-p-4 tw-w-full md:tw-w-1/2 lg:tw-my-4 lg:tw-px-4 lg:tw-w-1/3">
				<article
					class="tw-overflow-hidden tw-rounded-lg tw-shadow-lg backdrop-blur-xl tw-shadow-neutral-400"
				>
					<div class="tw-flex tw-justify-center">
						<img
							alt="Placeholder"
							class="tw-block tw-h-[150px] tw-w-[150px] lg:tw-h-[200px] lg:tw-w-[200px]"
							src="/sponsor/LEO GLOBAL.png"
						/>
					</div>

					<header
						class="tw-flex tw-items-center tw-justify-center tw-leading-tight tw-p-2 md:tw-p-4"
					>
						<h1 class="tw-text-lg">Leo Global Overseas</h1>
					</header>

					<footer
						class="tw-flex tw-items-center tw-justify-between tw-leading-none tw-p-2 md:tw-p-4"
					>
						<p class="tw-text-sm p-4">
							Leo Global strives to provide best in class study abroad advice by
							offering you course and university options that are personalised for
							you. After the university and the visa are taken care of, we run many
							sessions for the students where we go through key points such as which
							documents to take, what type of clothes are needed in a cold country,
							how to open bank accounts, and much more. By doing this, we hope to ease
							your nerves and also let you start planning better for your journey. Our
							job doesn’t quite finish when you depart from India as well.
						</p>
					</footer>
				</article>
			</div>
		</div>
	</div>
</div>

<div
	class="tw-container tw-mt-12 tw-mx-auto tw-px-4 md:tw-px-12 tw-bg-white tw-p-4 tw-rounded-lg tw-flex tw-flex-col tw-justify-center"
>
	<p
		class="tw-text-center tw-font-bold tw-text-transparent tw-text-4xl tw-bg-clip-text tw-bg-gradient-to-r tw-from-slate-900 tw-via-purple-900 tw-to-slate-900 tw-pb-4"
	>
		Associate sponsors
	</p>
	<div class="tw-flex tw-flex-wrap -tw-mx-1 lg:-tw-mx-4">
		<div class="tw-my-1 tw-p-4 tw-w-1/3 md:tw-w-1/6 lg:tw-my-4 lg:tw-px-4 lg:tw-w-[12.45%]">
			<div class=" tw-block tw-justify-center">
				<img alt="Placeholder" class=" tw-object-cover" src="/sponsor/KRITUNGA.png" />
			</div>

			<div class="tw-text-center tw-font-bold">
				<p>Kritunga Restaurant</p>
			</div>
		</div>

		<div class="tw-my-1 tw-p-4 tw-w-1/3 md:tw-w-1/6 lg:tw-my-4 lg:tw-px-4 lg:tw-w-[12.45%]">
			<div class=" tw-block tw-justify-center">
				<img alt="Placeholder" class=" tw-object-cover" src="/sponsor/Chikoos.png" />
			</div>

			<div class="tw-text-center tw-font-bold">
				<p>Chikoos Restaurant</p>
			</div>
		</div>

		<div class="tw-my-1 tw-p-4 tw-w-1/3 md:tw-w-1/6 lg:tw-my-4 lg:tw-px-4 lg:tw-w-[12.45%]">
			<div class=" tw-block tw-justify-center">
				<img alt="Placeholder" class=" tw-object-cover" src="/sponsor/v interiors.png" />
			</div>
			<div class="tw-text-center tw-font-bold">
				<p>V Interiors</p>
			</div>
		</div>

		<div class="tw-my-1 tw-p-4 tw-w-1/3 md:tw-w-1/6 lg:tw-my-4 lg:tw-px-4 lg:tw-w-[12.45%]">
			<div class=" tw-block tw-justify-center">
				<img alt="Placeholder" class=" tw-object-cover" src="/sponsor/KVR.png" />
			</div>
			<div class="tw-text-center tw-font-bold">
				<p>KVR Caterers and Events</p>
			</div>
		</div>

		<div class="tw-my-1 tw-p-4 tw-w-1/3 md:tw-w-1/6 lg:tw-my-4 lg:tw-px-4 lg:tw-w-[12.45%]">
			<div class=" tw-block tw-justify-center">
				<img alt="Placeholder" class=" tw-object-cover" src="/sponsor/saradha.png" />
			</div>
			<div class="tw-text-center tw-font-bold">
				<p>Sarada Opticals</p>
			</div>
		</div>

		<div class="tw-my-1 tw-p-4 tw-w-1/3 md:tw-w-1/6 lg:tw-my-4 lg:tw-px-4 lg:tw-w-[12.45%]">
			<div class=" tw-block tw-justify-center">
				<img alt="Placeholder" class=" tw-object-cover" src="/sponsor/K-CUBE.png" />
			</div>
			<div class="tw-text-center tw-font-bold">
				<p>K Cube Restaurant</p>
			</div>
		</div>

		<div class="tw-my-1 tw-p-4 tw-w-1/3 md:tw-w-1/6 lg:tw-my-4 lg:tw-px-4 lg:tw-w-[12.45%]">
			<div class=" tw-block tw-justify-center">
				<img alt="Placeholder" class=" tw-object-cover" src="/sponsor/CHARMINAR.png" />
			</div>
			<div class="tw-text-center tw-font-bold">
				<p>Charminar Chowrastha</p>
			</div>
		</div>

		<div class="tw-my-1 tw-p-4 tw-w-1/3 md:tw-w-1/6 lg:tw-my-4 lg:tw-px-4 lg:tw-w-[12.45%]">
			<div class=" tw-block tw-justify-center">
				<img alt="Placeholder" class=" tw-object-cover" src="/sponsor/KOLIHUT.png" />
			</div>
			<div class="tw-text-center tw-font-bold">
				<p>Five Star Koli Hut</p>
			</div>
		</div>

		<div class="tw-my-1 tw-p-4 tw-w-1/3 md:tw-w-1/6 lg:tw-my-4 lg:tw-px-4 lg:tw-w-[12.45%]">
			<div class=" tw-block tw-justify-center">
				<img alt="Placeholder" class=" tw-object-cover" src="/sponsor/RAJDANI.png" />
			</div>
			<div class="tw-text-center tw-font-bold">
				<p>Rajdhani Sports</p>
			</div>
		</div>

		<div class="tw-my-1 tw-p-4 tw-w-1/3 md:tw-w-1/6 lg:tw-my-4 lg:tw-px-4 lg:tw-w-[12.45%]">
			<div class=" tw-block tw-justify-center">
				<img alt="Placeholder" class=" tw-object-cover" src="/sponsor/asian.png" />
			</div>
			<div class="tw-text-center tw-font-bold">
				<p>Asian Beverages</p>
			</div>
		</div>

		<div class="tw-my-1 tw-p-4 tw-w-1/3 md:tw-w-1/6 lg:tw-my-4 lg:tw-px-4 lg:tw-w-[12.45%]">
			<div class=" tw-block tw-justify-center">
				<img alt="Placeholder" class=" tw-object-cover" src="/sponsor/DRUNKEN.png" />
			</div>
			<div class="tw-text-center tw-font-bold">
				<p>Drunken Monkey</p>
			</div>
		</div>
	</div>
</div>
