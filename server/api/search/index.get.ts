import data from "@/data.json";
const noJewels = data.length;
const jewels = data;
export default defineEventHandler(() => ({jewels, noJewels}));