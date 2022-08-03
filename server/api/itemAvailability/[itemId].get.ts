import data from "@/data.json";

export default defineEventHandler(handler => {
	const itemId = handler.context.params.itemId;
	const item = data.find(el => el.id === itemId);
	if (item === undefined) {
		return { isAvailable: false };
	}
	if (item.name) {
		return { isAvailable: true };
	}
});