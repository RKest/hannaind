import { validate } from "isemail"

class ValidationTester<Info> {
	private info: Info;
	constructor(info: Info) {
		this.info = info;
	}
	public errors: Object = {};
	public eval(field: keyof Info, message: string, test: (arg: string) => boolean): void {
		if (!test(this.info[field].toString())) {
			this.errors[field.toString()] = message;
		}
	}
}

export default defineEventHandler(async handler => {
	const body: ILocationInfo = await useBody(handler);
	const vaildationTester = new ValidationTester(body);
	vaildationTester.eval("email", "Invalid Email", validate);
	return vaildationTester.errors;
})