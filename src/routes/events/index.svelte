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
			width: auto;
			margin: auto;
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

<div id="portfolio">
	<div class="portfolio-header">
		<span class="color">E - </span>Kshetra
		<span class="header-caption"> About <span class="color"> E-Kshetra</span></span>
	</div>
	<div class="card2">
		<h3 class="blog-text-h tw-text-sm sm:tw-text-base md:tw-text-xl lg:tw-text-2xl">
			<p>
				The Department of Computer Science and Engineering is all set to host a 3-Day
				techno-cultural symposium “E-KSHETRA” on 28th ,29th and 30th of April 2022. It’s an
				ecstatic & innovative festival that offers a grand platform to its students to share
				ideas, showcase their technical skills, innovative instinct of mind along with
				social & cultural initiatives. E-KSHETRA is the ideal combination of technology, joy
				and culture.

				<span class="color1 font1 tw-text-sm sm:tw-text-base md:tw-text-xl lg:tw-text-2xl">
					We organize and elaborate technical as well as non-technical events for everyone
					to be a part of. It helps them to foster innovations with the potential for
					tremendous change.</span
				>
				However, this techno-cultural fest does not confine itself to its domain. E-KSHETRA encompasses
				a diverse range of interests from students with innovative ideas. These include events
				like Paper Presentation, Poster Presentation, Technical Quiz and Other non-technical
				events like Blind Coding & E-sports.
			</p>
		</h3>
	</div>
	<div id="portfolio-content">
		<div class="portfolio portfolio-first">
			<div class="portfolio-image">
				<img src="images/paper-presentation.jpg" alt="portfolio-first" />
			</div>
			<div class="portfolio-text">
				<h2>Paper Presentation</h2>
				<p>
					<span class="color1 font1">About the Event</span><br />
					Paper presentation is an individual competition where each participant is required
					to make a paper about a given topic or area, and then present it in front of the
					juries.
					<br />
					<span class="color1 font1">Purpose:</span><br />
					To enhance participant's ability in Writing or making papers in English as well as
					to present it, and also to broaden the mind of the participants.<br /><span
						class="color1 font1">Team Formation:</span
					><br />
					1. Team can have maximum of 2 participants<br />
					2. No participants can be part of more than one team.<br />
					3. It is not necessary that the participants forming a team should be from the same
					college.<br />
					4. There is no restriction on the number of teams from the same college.<br />

					<span class="color1 font1">Presentation Rules:</span><br />
					1. The paper submitted will have to be presented during the event.<br />
					2. Hard copies of the same are to be submitted before presentation to Judges.<br
					/>
					3. The Teams will get 5 minutes to present their paper. And 2 minutes will be for
					questioning by judges.<br />
					4. The participants will have to present their papers in MS-Power Point (ppt) format
					only.<br />
					5. Violation of any rule can result in rejection of paper.<br />

					<span class="color1 font1">Event Info:</span><br />
					NAVYA - 8978573886 <br />
					SRAVYA - 9000770421 <br />
					SAYAM BOHRA - 8184941197 <br />
					PAVAN VARMA - 8179977806 <br />
				</p>
			</div>
		</div>
		<div class="portfolio portfolio-second">
			<div class="portfolio-image">
				<img src="/images/poster-presentation.jpg" alt="portfolio-second" />
			</div>
			<div class="portfolio-text">
				<h2>Poster Presentation</h2>
				<p>
					<span class="color1 font1">About the Event</span><br />
					A poster presentation is a way to communicate your research or your understanding
					of a topic in a concise and visually engaging format. A poster presentation usually
					includes two elements: • a poster • a brief verbal explanation of the poster content
					or topic (often less than 5 minutes).

					<br />
					<span class="color1 font1">Purpose:</span><br />
					To enhance participant's ability in Writing or Poster Designing in English as well
					as to present it, and also to broaden the mind of the participants.<br /><span
						class="color1 font1">Team Formation:</span
					><br />
					1. Team can have maximum of 2 participants<br />
					2. No participants can be part of more than one team.<br />
					3. It is not necessary that the participants forming a team should be from the same
					college.<br />
					4. There is no restriction on the number of teams from the same college.<br />

					<span class="color1 font1">Presentation Rules:</span><br />
					1.Text and presentation should be in ENGLISH only.<br />
					2.Make sure that the specific sections (such as the background, methods, results,
					and conclusions) are easy to locate in the poster. <br />
					3.Try to keep the text easy to read and concise.<br />
					4.The poster should have a clear message, a logical layout and be easy to comprehend<br
					/>
					5. Violation of any rule can result in rejection of paper<br />
				</p>
			</div>
		</div>

		<div class="portfolio portfolio-third">
			<div class="portfolio-image">
				<img src="images/technical-quiz.jpg" alt="portfolio-third" />
			</div>
			<div class="portfolio-text">
				<h2>Technical Quiz</h2>
				<p>
					<span class="color1 font1">About the Event</span><br />
					A Technical Quiz is a event which can also be called a mind sport where in the participants
					in teams attempt to answer questions posed to them correctly, in order to win a prize.
					<br />
					<span class="color1 font1">Purpose:</span><br />
					We designed this technical quiz to promote, a fun way of study and help in the process
					of improving one’s technical knowledge. <br /><span class="color1 font1"
						>Team Formation:</span
					><br />
					1. Team can have maximum of 4 participants<br />
					2. No participants can be part of more than one team.<br />
					3. It is not necessary that the participants forming a team should be from the same
					college.<br />
					4. There is no restriction on the number of teams from the same college.<br />

					<span class="color1 font1">Presentation Rules:</span><br />
					1. There will be 3 rounds and 5 questions in each round for each team.<br />
					2. Time allotted: - 30 seconds for each question 10 seconds for passed over question.<br
					/>
					3. Point awarded: 2 points for each question 1 Bonus point for passed over question.<br
					/>
					4. All the questions will be related to technical knowledge (Computer science).<br
					/>
					<br />
				</p>
			</div>
		</div>
		<div class="portfolio portfolio-fourth">
			<div class=" portfolio-image">
				<img src="images/BLIND-CODING-EDIT.jpg" alt="portfolio-fourth" />
			</div>
			<div class="portfolio-text">
				<h2>Blind Coding</h2>
				<p>
					<span class="color1 font1">About the Event</span><br />
					Blind Coding is a fun event where the participants will attempt to code blindly (with
					monitor off) without running it in order to win a prize.
					<br />
					<span class="color1 font1">Purpose:</span><br />
					We designed these blind coding to promotes a fun way to display your coding skills
					and help in the process of improving one’s coding knowledge. <br />

					<span class="color1 font1">Rules:</span><br />
					1.Each participant has to write the code for given problem, with MONITOR OFF.<br
					/>
					2.Participants whose code gets executed will be given higher preference.<br />
					3.The second preference will be given to code with least number of errors.<br />
					4.In case of tie in number of errors, TIME of SUBMISSION will be considered.<br
					/>
					<br />
				</p>
			</div>
		</div>

		<div class="portfolio portfolio-fourth">
			<div class=" portfolio-image">
				<img src="images/BGMI-POSTER-FINAL.png" alt="portfolio-fourth" />
			</div>
			<div class="portfolio-text">
				<h2>Mobile E-Sports</h2>
				<p>
					<span class="color1 font1">About the Event</span><br />
					Mobile E-sports is an online fun event where the participants will battle against
					each other in a Battle-Royale (BGMI).
					<br />
					<span class="color1 font1">Purpose:</span><br />
					To enhance participant's ability in Writing or making papers in English as well as
					to present it, and also to broaden the mind of the participants.<br />

					<span class="color1 font1">Rules:</span><br />
					1. Each participant should be having an android or IPhone device only.<br />
					2. Each Team must maintain, during the tournament exactly four players which is the
					minimum and maximum number of players allowed<br />
					3. Each team must select their captain who shall be responsible for communications
					with the officials of the tournament.<br />
					4. Players must not use an emulator to play on a PC or Ipad or any other device that
					is not a handheld device.<br />
					5. Players are not allowed any type of triggers.
					<br />
				</p>
			</div>
		</div>

		<div class="portfolio portfolio-fourth">
			<div class=" portfolio-image">
				<img src="images/cultural.jpg" alt="portfolio-fourth" />
			</div>
			<div class="portfolio-text">
				<h2>Cultural Events</h2>
				<p>
					<span class="color1 font1">About the Event</span><br />
					This event is designed for entertainment and enjoyment. This is a event of some importance
					related to some branch of art, culture or values.
					<br />
					The main aim of this event is to propagate and disseminate cultural themes. These
					may refer to different arts such as performing musicals.
				</p>
			</div>
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
