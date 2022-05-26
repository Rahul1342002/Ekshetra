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
	<!--main css file-->
	<style>
		.ab {
			color: #000;
			text-align: center;
		}
		.ek2 {
			height: 200px;
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

<body>
	<div id="navigation-content">
		<div class="navigation-close">
			<span class="close-first" />
			<span class="close-second" />
		</div>
		<div class="navigation-links">
			<a href="/" data-text="HOME" id="home-link">HOME</a>
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#" data-text="ABOUT" id="about-link">ABOUT</a>
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
	<!--about-->
	<div id="about">
		<!--about content-->
		<div id="about-content">
			<div class="about-header">
				About <span class="color">Us</span>
			</div>
			<div class="about-img">
				<!-- svelte-ignore a11y-missing-attribute -->
				<img class="tw-p-4 lg:tw-pb-20" src="/images/clg.jpg" />
			</div>
			<div class="card about-main">
				<div class="container1 wow tw-flex tw-justify-start tw-flex-col">
					<h2 class="ab tw-text-xl sm:tw-text-2xl md:tw-text-3xl lg:tw-text-4xl">
						BITS Vizag
					</h2>
					<br />
					<!--about description-->
					<span
						class="about-cont tw-text-sm sm:tw-text-base md:tw-text-xl lg:tw-text-2xl"
					>
						BABA Institute of Technology and Sciences (BITS Vizag) Vishakhapatnam is the
						pioneer among many other private institutions in the field of Engineering
						and Technology.
						<span
							class="color1 font1 tw-text-sm sm:tw-text-base md:tw-text-xl lg:tw-text-2xl"
						>
							It's a well-defined college, sprawling in around 15 acres and imparting
							undergraduate and postgraduate courses.</span
						>
						The college is affiliated to Jawaharlal Nehru Technical University (JNTUK) Kakinada,
						accredited by NAAC and approved by AICTE, New Delhi which located in the lush
						green city of Vishakhapatnam, Andhra Pradesh.
					</span>
				</div>
			</div>
			<!--about picture-->

			<div class="card1 about-main">
				<div class="container2 wow">
					<!--about description-->
					<h2 class="ab tw-text-xl sm:tw-text-2xl md:tw-text-3xl lg:tw-text-4xl">
						Department of CSE
					</h2>
					<br />
					<span
						class="about-cont tw-text-sm sm:tw-text-base md:tw-text-xl lg:tw-text-2xl"
					>
						The Department of Computer Science and Engineering was established in the
						year 2008 at BITS Vizag. The primary goal of CSE is to provide best IT
						infrastructure, world class learning methods & research environment as well
						as adopt industry practices through industry collaborations that help
						students inculcate moral and ethical values. The alacrity of the students to
						learn makes it easier for the industry-trained experienced faculty to
						produce top-notch engineers who are being recruited by reputed companies all
						over the world. .
					</span>
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="footer-text">
				<img src="/images/copyright.png" alt="copyright-img" class="images" height="14px" />
				By FIT Team, Dept. Of CSE
			</div>
		</div>
	</div>
</body>
