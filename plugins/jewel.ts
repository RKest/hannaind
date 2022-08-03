import config from "@/config";

const base = (image: string): string => image.split(".").at(0);
const ext = (image: string): string => image.split(".").at(-1);

const defaultImageRes = config.defualtImageRes[0];

export default defineNuxtPlugin(_ => ({
	"provide": {
		imageSrc: (jewel: Jewel, qual: ImageQualities = defaultImageRes) => 
			`/images/${jewel.id}/${base(jewel.images[0])}${qual}.${ext(jewel.images[0])}`,
		imageSrcs: (item: Jewel): string[] => item.images.map(path => {
			const [basePath, ext] = path.split(".");
			return `/images/${item.id}/${basePath}${defaultImageRes}.${ext}`; 
		}),
		jewelHref: (jewel: Jewel) => `/items/${jewel.id}`,
		jewelPrice: (jewel: Jewel) => +jewel.price / 100
	}
}));