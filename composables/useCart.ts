export default function() {
	return useState<ICart>('cart', () => ({
		items: []
	}));
}