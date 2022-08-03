import data from "@/data.json";
import { routeParamsFromUrl, pageFromUrl } from '@/plugins/route';


class Comparator<T, U> {
	private checker: T;
	private previousCheck: boolean;
	private val: U;
	public get value() { return this.val; }
	constructor(checker: T, initVal: U, previousCheck = false) {
		this.checker = checker;
		this.previousCheck = previousCheck;
		this.val = initVal;
	}

	check(comp: T, ...bindFuns: ((val: U) => U)[]) {
		if (!this.previousCheck && comp === this.checker) {
			this.previousCheck = true;
			for (const fun of bindFuns){
				this.val = fun(this.val);
			}
		}
		return this;
	}

}

const comparePrices = (el1: Jewel, el2: Jewel) => {
	if (el1.price < el2.price) {
		return -1;
	}
	if (el2.price < el1.price) {
		return 1;
	}
	return 0;
}

const sortWith = <T>(predFun: (a: T, b: T) => 0 | 1 | -1) => (arr: T[]) => arr.sort(predFun);
const reverse = <T>(arr: T[]) => arr.reverse();

const makesFilter = (el: Jewel, objParams: QueryParams) => (key: ParamVarKeys) =>
	key === "sort" || objParams[key] === undefined || objParams[key] === el[key];

export default defineEventHandler(event => {
	const config = useRuntimeConfig();
	const params: string = event.context.params.params;

	const filteredParams = routeParamsFromUrl(params);

	const filteredParamKeys = Object.keys(filteredParams) as [ParamVarKeys];
	const filteredData = data.filter(el => filteredParamKeys.every(makesFilter(el, filteredParams)));

	const page = pageFromUrl(params);
	const maxJewelsPerPage = config.public.maxJewelsPerPage;
	const slicedData = filteredData.slice((page - 1) * maxJewelsPerPage, page * maxJewelsPerPage);

	const sort = new Comparator(filteredParams.sort, slicedData);
	const sortItems = sortWith(comparePrices);
	const jewels = sort
		.check("lth", sortItems, reverse)
		.check("htl", sortItems)
		.value;

	const noJewels = filteredData.length;
	return { jewels, noJewels };
});