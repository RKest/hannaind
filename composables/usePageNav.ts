export default function () {
	return useState<IPageNav>('nav', () => ({
		currPage: 1,
		nPages: 1,
		pageNavLabels: [1],
		showIncrement: true,
		showDecrement: false
	}));
}