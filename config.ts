export default {
	//Category of items, used for filtering store results
	"category": ["bears", "birds", "buildozers"],
	//Same as tha category, remember this originally is a jewelry store
	"material": ["bipeds", "quadrupeds"],
	//Sorting of items in price either from high to low or low to high
	"sort": ["htl", "lth"],
	//Qualities of images possible, in the future this will be implemented to fetch 
	//appropriate image given a screen size in order to save bandwidth
	"imageQualities": ["-4k", "-480p", "-720p", "-1440p", "-hd", ""],
	//Self explanitory
	"landingBgImagePaths": [
		"/images/crow/crow1.jpeg",
		"/images/koala/koala1.jpeg",
		"/images/grizzly/grizzly1.jpeg",
		"/images/Caterpillar_D11T_CD/1.jpeg"
	],
	//Items featured on the main page
	//Note that each of these have to return at least 3 items
	"landingFetchPaths": [
		"/api/search/bears/1",
		"/api/search/birds/1",
		"/api/search/buildozers/1"
	],
	//Also self explanitory, changing this requires also changing the name of image files eg:
	// /images/panda/panda1.jpeg -> /images/panda/panda1-hd.jpeg
	"defualtImageRes": [""]
} as const;