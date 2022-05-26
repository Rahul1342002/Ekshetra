<svelte:head>
	<link
		href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<body>
	<div class="card-outside">
		<div class="card">
			<div
				style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;"
			>
				<i class="checkmark">✓</i>
			</div>
			<h1 class="large-text">Success</h1>
			<p class="large-text">
				We received your purchase request;<br /> we'll be in touch shortly!
			</p>
			<p>
				You can go to <span
					on:click={(_) => window.location.replace('/profile')}
					class=" tw-underline tw-text-main-red tw-font-semibold tw-pointer-events-auto tw-cursor-pointer"
					>Profile</span
				> To check more about the event
			</p>
		</div>
	</div>
</body>

<style>
	body {
		text-align: center;
		background: #ebf0f5;
		min-height: 100vh;
		overflow: hidden;
	}
	h1 {
		color: #88b04b;
		font-family: 'Nunito Sans', 'Helvetica Neue', sans-serif;
		font-weight: 900;
		font-size: 40px;
		margin-bottom: 10px;
	}
	p {
		color: #404f5e;
		font-family: 'Nunito Sans', 'Helvetica Neue', sans-serif;
		font-size: 20px;
		margin: 0;
	}
	i {
		color: #9abc66;
		font-size: 100px;
		line-height: 200px;
	}
	.card {
		padding-top: 4rem;
		background: white;
		padding: 60px;
		border-radius: 4px;
		box-shadow: 0 2px 3px #c8d0d8;
		display: inline-block;
	}

	.card-outside {
		padding-top: 6rem;
	}
</style>
