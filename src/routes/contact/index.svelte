<script>
	//  import Particles from "svelte-particles";
	//  Particles("particles", {"particles":{"number":{"value":40,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});

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

<div id="navigation-content">
	<div class="navigation-close">
		<span class="close-first" />
		<span class="close-second" />
	</div>
	<div class="navigation-links">
		<a href="/" data-text="HOME" id="home-link">HOME</a>
		<a href="/about" data-text="ABOUT" id="about-link">ABOUT</a>
		<a href="/events" data-text="E-KSHETRA" id="portfolio-link">E-KSHETRA</a>
		<a href="/register" data-text="REGISTRATION" id="blog-link">REGISTRATION</a>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="/sponsor" data-text="SPONSORS" id="sponsor-link">SPONSORS</a>
			<a href="/gallery" data-text="GALLERY" id="gallery-link">GALLERY</a>
		<a href="#" data-text="CONTACT" id="contact-link">CONTACT US</a>
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

<div id="contact">
	<div class="contact-header">
		Contact <span class="color"> Us</span>
		<div class="contact-header-caption"><span class="color"> Get</span> In Touch.</div>
	</div>
	<div class="contact-content">
		<!--Contact information-->
		<div class="contact-info">
			<div class="contact-info-header">Event Info</div>
			<div class="contact-info-content">
				<div class="contect-info-content-line">
					<img src="/images/icon-name.png" class="icon" alt="name-icon" />
					<div class="contact-info-icon-text">
						<h6>Name</h6>
						<p>Gunaditya</p>
						<p>Sai Sandeep</p>
						<p>Sunil</p>
						<p>Vikram</p>
					</div>
				</div>
				<div class="contect-info-content-line">
					<img src="/images/icon-location.png" class="icon" alt="location-icon" />
					<div class="contact-info-icon-text">
						<h6>Venue</h6>
						<p>BITS Vizag,Visakhapatnam</p>
					</div>
				</div>
				<div class="contect-info-content-line">
					<img src="/images/icon-phone.png" class="icon" alt="phone-icon" />
					<div class="contact-info-icon-text">
						<h6>Call</h6>
						<p>+91 8374522989</p>
						<p>+91 7008923876</p>
						<p>+91 6300064525</p>
						<p>+91 7702387858</p>
					</div>
				</div>

				<div class="contect-info-content-line">
					<img src="/images/icon-email.png" class="icon" alt="email-icon" />
					<div class="contact-info-icon-text">
						<h6>Email</h6>
						<p>info.ekshetra@gmail.com</p>
					</div>
				</div>
			</div>
			<!--Contact information end-->
		</div>
	</div>
	<!--copyright-section You Can Remove After Downloading-->
	<div class="footer">
		<div class="footer-text">
			<img src="/images/copyright.png" alt="copyright-img" class="images" height="14px" /> By FIT
			Team, Dept. Of CSE
		</div>
	</div>
	<!--copyright-section-->
</div>
