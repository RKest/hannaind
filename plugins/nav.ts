const addSlash = (param: string) => param ? `/${param}` : '';
const range = (n: number) => [...Array(n).keys()];
const add_n = (adder: number) => (n: number) => n + adder;
const N_MAX_PAGE_NAV = 5;

type sfun = (s: string) => string
class StringBuilder {
	private val: string = ""
	private mod: sfun
	public get value() { return this.val; }
	constructor(mod: sfun = (s) => s) {
		this.mod = mod;
	}
	build(s: string) {
		this.val += this.mod(s);
		return this;
	}
}

const toggleNav = (nav: INav, pageNav: IPageNav, navKey: string, navVal: any) => {
	if (nav[navKey] === navVal) {
		nav[navKey] = undefined;
	} else {
		nav[navKey] = navVal;
	}
	updateTo(nav, pageNav);
}

const updateTo = (nav: INav, pageNav: IPageNav) => {
	nav.to = new StringBuilder(addSlash)
		.build('search')
		.build(nav.category)
		.build(nav.material)
		.build(nav.sort)
		.build(pageNav.currPage.toString())
		.value;
}

const setNoPages = (nav: IPageNav, numberOfJewels: number): void => {
	const config = useRuntimeConfig();
	nav.nPages = Math.ceil(numberOfJewels / config.public.maxJewelsPerPage);
	nav.pageNavLabels = range(Math.min(nav.nPages, N_MAX_PAGE_NAV))
		.map(add_n(1));
	nav.showIncrement = nav.currPage < nav.nPages;
	nav.showDecrement = nav.currPage > 1;
}

const navToPage = (pageNav: IPageNav, page: number) => {
	pageNav.currPage = page;
	const setPageLabels = (noLabels: number, addInc: number) =>
		pageNav.pageNavLabels = range(noLabels).map(add_n(addInc));
	if (pageNav.nPages <= N_MAX_PAGE_NAV || page <= 3) {
		setPageLabels(pageNav.nPages, 1);
	} else if (page + 2 <= pageNav.nPages) {
		setPageLabels(N_MAX_PAGE_NAV, page - 2)
	} else {
		setPageLabels(N_MAX_PAGE_NAV, page + 1 - N_MAX_PAGE_NAV);
	}
	pageNav.showIncrement = page < pageNav.nPages;
	pageNav.showDecrement = page > 1
}

export default defineNuxtPlugin(_ => ({
	provide: {
		toggleNav,
		updateTo,
		setNoPages,
		navToPage
	}
}));