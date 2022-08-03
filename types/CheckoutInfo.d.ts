declare interface ILocationInfo {
	name: string;
	surname: string;
	email: string;
	phone: string;
	country: string;
	city: string;
	address: string;
	zip_code: string;
}

declare interface IBillingInfo {
	card_number: string;
	expiration_date: string;
	cvc: string;
}

declare interface ICheckoutInfo {
	location_info: ILocationInfo;
	billing_info: IBillingInfo;
}

interface IValidationError {
	errKey: string;
	message: string;
}
