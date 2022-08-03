import data from '@/data.json';

export default defineEventHandler(handler => {
	return data.find(el => el.id === handler.context.params.itemId);
});