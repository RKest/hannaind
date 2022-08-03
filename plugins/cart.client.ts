const addToCart = async (item: Jewel) => {
	const cart = useCart();
	const res = await fetch(`/api/itemAvailability/${item.id}`);
	const { isAvailable } = await res.json();
	if (isAvailable) {
		cart.value.items.push(item);
	} else {
		alert("Item unavaiable we apologise");
	}
}

const removeFromCart = (item: Jewel) => {
	const cart = useCart();
	cart.value.items = cart.value.items.filter(el => el.id !== item.id);
}

export default defineNuxtPlugin(_ => ({
	provide: {
		addToCart,
		removeFromCart
	}
}));