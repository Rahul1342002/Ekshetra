<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ session }) {
		// @ts-ignore
		if (!session.user.authenticated) {
			return {
				status: 200
			};
		} else {
			return {
				status: 302,
				redirect: '/profile'
			};
		}
	}
</script>

<script>
	async function loginUser(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch('/api/login', {
					body: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'POST'
				});
				const json = await res.json();
				resolve(json);
			} catch (err) {
				console.log(err);
				reject(err);
			}
		});
	}

	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import jQuery from 'jquery';
	import { user } from '../../stores';
	onMount(() => {
		document.querySelector('#signin').addEventListener('click', async (e) => {
			e.preventDefault();

			const data = {};
			// @ts-ignore
			data.email = document.getElementById('your_name').value;
			// @ts-ignore
			data.password = document.getElementById('your_pass').value;

			try {
				const res = await loginUser(data);
				if (res?.error) {
					alert(res.message);
				} else {
					console.log(res.result);
					user.set(res.result);
					// @ts-ignore
					window.location.replace('/profile');
				}
			} catch (err) {
				console.log(err);
				alert('something went wrong');
			}
		});

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
		<a href="/events" data-text="E-KSHETRA" id="portfolio-link">E-KSHETRA</a>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="#" data-text="REGISTRATION" id="blog-link">REGISTRATION</a>
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

<div id="blog">
	<div class="blog-header">
		LOGIN
		<span class="header-caption"> <span class="color" /></span>
		<div class="main">
			<section class="sign-in">
				<div class="container">
					<div class="signin-content">
						<div class="signin-image">
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<figure>
								<img src="/images/signin-image.jpg" alt="sing up image" />
							</figure>
							<a href="/register" class="signup-image-link">Create an account</a>
						</div>

						<div class="signin-form">
							<h2 class="form-title">Sign In</h2>
							<form method="POST" class="register-form" id="login-form">
								<div class="form-group">
									<label for="your_name"
										><i class="zmdi zmdi-account material-icons-name" /></label
									>
									<input
										type="text"
										name="your_name"
										id="your_name"
										placeholder="Email"
									/>
								</div>
								<div class="form-group">
									<label for="your_pass"><i class="zmdi zmdi-lock" /></label>
									<input
										type="password"
										name="your_pass"
										id="your_pass"
										placeholder="Password"
									/>
								</div>
								<div class="form-group form-button">
									<input
										type="submit"
										name="signin"
										id="signin"
										class="form-submit"
										value="Log in"
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
<div class="footer">
	<div class="footer-text">
		<img src="/images/copyright.png" alt="copyright-img" class="images" height="14px" /> By FIT Team,
		Dept. Of CSE
	</div>
</div>
