export default function() {
	return useState<{imageSrc: string, isExpanded: boolean}>('image-expanstion', () => ({
		imageSrc: '',
		isExpanded: false
	}));
}