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
	// @ts-nocheck

	async function registerUser(data) {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch('/api/register', {
					body: JSON.stringify(data),
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'POST'
				});
				const json = await res.json();
				if (res.status === 200) {
					resolve(json);
				} else {
					resolve(json);
				}
			} catch (err) {
				console.log(err);
				reject(err);
			}
		});
	}

	// onMount(() => {
	//     registerUser({"name":"Sai Sandeep","roll":"19NR1A0594","email":"saisandeep1811@gmail.com","password":"20011811","whatsapp":"7008923876","department":"CSE","college":"BITS Vizag"}).then(res=>{
	//         console.log(res)
	//     }).catch(err=>{
	//         console.error(err)
	//     })
	// })

	import gsap from 'gsap';
	import { onMount } from 'svelte';
	import jQuery from 'jquery';
	import { user } from '../../stores';
	onMount(() => {
		document.getElementById('signup').addEventListener('click', async (e) => {
			e.preventDefault();

			const data = {};
			data.name = document.getElementById('name').value;
			data.college = document.getElementById('college').value;
			data.roll = document.getElementById('roll').value;
			data.whatsapp = document.getElementById('number').value;
			data.department = document.getElementById('department').value;
			data.email = document.getElementById('email').value;
			data.password = document.getElementById('pass').value;
			const repeat = document.getElementById('re_pass').value;

			if (data.password !== repeat) {
				alert("Password didn't Match. Please retry");
				return;
			}

			try {
				const res = await registerUser(data);
				if (res?.error) {
					alert(res.message);
				} else if (res?.result?.id) {
					console.log(res);
					user.set(res.result);
					window.location.replace('/profile');
				} else {
					alert('something went wrong');
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
	<link rel="icon" type="image/png" href="images/e-kshetra.png" />
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
		REGISTRATIONS
		<span class="header-caption"> <span class="color" /></span>
		<div class="main">
			<!-- Sign up form -->
			<section class="signup">
				<div class="container">
					<div class="signup-content">
						<div class="signup-form">
							<h2 class="form-title">Sign up</h2>
							<form method="POST" class="register-form" id="register-form">
								<div class="form-group">
									<label for="name"
										><i class="zmdi zmdi-account material-icons-name" /></label
									>
									<input
										type="text"
										name="name"
										id="name"
										placeholder="Your Name"
									/>
								</div>
								<div class="form-group">
									<label for="name"
										><i class="zmdi zmdi-account material-icons-name" /></label
									>
									<input
										type="text"
										name="name"
										id="college"
										placeholder="Your College Name"
									/>
								</div>
								<div class="form-group">
									<label for="name"
										><i class="zmdi zmdi-account material-icons-name" /></label
									>
									<input
										type="text"
										name="name"
										id="roll"
										placeholder="College Roll No"
									/>
								</div>
								<div class="form-group">
									<label for="name"
										><i class="zmdi zmdi-account material-icons-name" /></label
									>
									<input
										type="text"
										name="name"
										id="department"
										placeholder="Department"
									/>
								</div>
								<div class="form-group">
									<label for="name"
										><i class="zmdi zmdi-account material-icons-name" /></label
									>
									<input
										type="text"
										name="name"
										id="number"
										placeholder="Whatsapp Number"
									/>
								</div>

								<div class="form-group">
									<label for="email"><i class="zmdi zmdi-email" /></label>
									<input
										type="email"
										name="email"
										id="email"
										placeholder="Your Email"
									/>
								</div>
								<div class="form-group">
									<label for="pass"><i class="zmdi zmdi-lock" /></label>
									<input
										type="password"
										name="pass"
										id="pass"
										placeholder="Password"
									/>
								</div>
								<div class="form-group">
									<label for="re-pass"><i class="zmdi zmdi-lock-outline" /></label
									>
									<input
										type="password"
										name="re_pass"
										id="re_pass"
										placeholder="Repeat your password"
									/>
								</div>
								<div class="form-group form-button">
									<input
										type="submit"
										name="signup"
										id="signup"
										class="form-submit"
										value="Register"
									/>
								</div>
							</form>
						</div>
						<div class="signup-image">
							<!-- svelte-ignore a11y-img-redundant-alt -->
							<figure>
								<img src="images/signup-image.jpg" alt="sing up image" />
							</figure>
							<a href="/login" class="signup-image-link">I am already member</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
	<div class="footer">
		<div class="footer-text">
			<img src="./images/copyright.png" alt="copyright-img" class="images" height="14px" /> By
			FIT Team, Dept. Of CSE
		</div>
	</div>
</div>
