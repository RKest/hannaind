export default function() {
	return useState<IBackButton>('backButton', () => ({
		to: '/search/1',
		isVisible: true 
	}));
}