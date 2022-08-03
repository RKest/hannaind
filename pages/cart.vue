<script setup lang='ts'>
definePageMeta({
	layout: "none"
});
useHead({
	title: "Hello",
	link: [{ rel: 'icon', type: 'image/png', href: '/icons/favicon.png' }],
	bodyAttrs: {
		style: "margin: 0; overflow-y: hidden; width: 300vw;"
	}
});

const cart = useCart();
const checkoutInfo = useCheckoutInfo();

let currElInx = 0;
let scrollTimeout;
const scrollToEl = () => {
	const elsToScrollTo = document.querySelectorAll('section');
	const elToScrollTo = elsToScrollTo[currElInx];
	const xOffset = elToScrollTo.offsetLeft;
	scrollTo(xOffset, 0);
}

const scrollToSmoth = () => {
	const { $scrollToIndex } = useNuxtApp();
	window.onscroll = () => {
		clearTimeout(scrollTimeout);
		scrollTimeout = setTimeout(() => {
			window.onscroll = scrollToEl;
		}, 300);
	}
	const elsToScrollTo = document.querySelectorAll('section');
	currElInx = Math.max(0, Math.min(elsToScrollTo.length, currElInx));
	$scrollToIndex('section', currElInx);
}

const forward = () => {
	currElInx += 1;
	scrollToSmoth();
}

const backward = () => {
	currElInx -= 1;
	scrollToSmoth();
}

onBeforeMount(() => {
	window.onscroll = scrollToEl;
});

const errs = ref<Object>({});
const proceedToBillinInfo = async () => {
	const validationErros = await $fetch('/api/validate/location',
		{ method: "post", body: checkoutInfo.value.location_info });
	if (!Object.keys(validationErros).length) {
		errs.value = {};
		forward();
	} else {
		errs.value = validationErros;
	}
}
</script>

<template>
	<div class="items" v-if="cart.items.length">
		<div class="cart-items">
			<ChechoutItem :item="item" v-for="item in cart.items" />
		</div>
		<div>
			Total: {{ cart.items
					.map(item => item.price)
					.reduce((prev, curr) => prev + curr, 0)
			}}zł
		</div>
	</div>
	<div class="main">
		<section>
			<div class="inputs-container">
				<div class="inp-wrap" v-for="key in Object.keys(checkoutInfo.location_info)" :key="key">
					<InpText :obj="checkoutInfo.location_info" :objkey="key" @focus="delete errs[key]" />
					<p class="error" v-if="errs[key]"> {{ errs[key] }} </p>
				</div>
				<button @click="proceedToBillinInfo">Proceed</button>
			</div>
		</section>
		<section>
			<div class="inputs-container">
				<button @click="backward">Go back</button>
				<InpText v-for="key in Object.keys(checkoutInfo.billing_info)" :key="key"
					:obj="checkoutInfo.billing_info" :objkey="key" />
				<button @click="forward">Pay</button>
			</div>
		</section>
		<section>
			<button @click="backward">Go back</button>
			<p>Thank you for your purchase</p>
		</section>
	</div>
</template>

<style scoped lang='scss'>
.main {
	display: flex;
	flex-direction: row;
	overflow-x: auto;
	scroll-behavior: smooth;
	scroll-snap-type: mandatory;
	width: 300vw;
}

.items {
	background: $main-color;
	position: fixed;
	top: 14vh;
	left: 60vw;
	width: calc(26vw + 10px);
}

.cart-items {
	max-height: 60vh;
	overflow-y: auto;
}

.cart-items::-webkit-scrollbar{
	height: 2px;
	width: 5px;
}

section {
	@include align-center;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
}

.error {
	border-top: 1px solid red;
	margin: 0px;
	color: red;
	font-size: small;
}

.inputs-container {
	margin-left: -20vw;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.page-nav {
	user-select: none;
	cursor: pointer;
}

button {
	margin-top: 1rem;
	border: none;
	background: $main-color;
	font-size: x-large;
	cursor: pointer;
}

p {
	font-size: x-large;
}

button:hover {
	color: $accent-color;
}

@media all and (orientation: portrait) {
	.items {
		position: fixed;
		top: 7vh;
		height: min-content;
		left: 20vw;
	}

	.cart-items {
		width: 60vw;
		max-width: 60vw;
		display: flex;
		flex-direction: row;
		overflow-x: scroll;
	}

	.cart-items > * {
		min-width: 26vw;
	}

	.inputs-container {
		padding: 0px 1rem;
		border-left: 1px solid $secondary-color;
		border-right: 1px solid $secondary-color;
		margin-left: 0px;
		margin-bottom: -30vh;
	}


}
</style>