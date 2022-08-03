export default function() {
	return useState<ICheckoutInfo>('checkout-info', () => ({
		location_info: {
			name: "",
			surname: "",
			email: "",
			phone: "",
			country: "",
			city: "",
			address: "",
			zip_code: ""
		}, 
		billing_info: {
			card_number: "",
			expiration_date: "",
			cvc: ""
		}
	}));
}