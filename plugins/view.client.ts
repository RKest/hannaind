const scrollToIndex = (selector: string, index: number) => {
	const els = document.querySelectorAll(selector);
	els[index].scrollIntoView({
		behavior: "smooth",
		block: "nearest",
		inline: "start"
	});
}
const scrollToImage = (index: number) => scrollToIndex(".slides > div", index);
const expandImage = (imageSrc: string) => {
	const imageExpansion = useImageExpansion();
	imageExpansion.value.imageSrc = imageSrc;
	imageExpansion.value.isExpanded = true;
}
const collapseImage = () => {
	const imageExpansion = useImageExpansion();
	imageExpansion.value.isExpanded = false;
}
export default defineNuxtPlugin(_ => ({
	provide: {
		scrollToIndex,
		scrollToImage,
		expandImage,
		collapseImage
	}
}));