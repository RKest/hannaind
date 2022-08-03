export default function () {
	return useState<INav>('nav', () => ({
		category: undefined,
		material: undefined,
		sort: undefined,
		to: '/search'
	}));
}