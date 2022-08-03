import { defineNuxtPlugin } from "#app";

const _includes = <T>(array: T[]) => (el: T) => array.includes(el);
export const routeParamsFromUrl = (urlParams: string): QueryParams => {
	const paramVals = urlParams.split('/') as ParamVarVals[];
	return routeParamsFromParamsArray(paramVals)
}

const routeParamsFromParamsArray = (paramVals: string[]): QueryParams => {
	const config = useRuntimeConfig();
	const filterArray = config.public.filters as IFilter[];
	const filters = filterArray.reduce((prev, { key, vals }) => 
		Object.assign(prev, { [key]: vals }), {}) as TConfig;

	const filterKeys = Object.keys(filters);
	const filteredParamsArray = filterKeys.map(key => ({ [key]: filters[key].find(_includes(paramVals)) }));
	const filteredParams = Object.assign({}, ...filteredParamsArray) as QueryParams;
	return filteredParams;
}

export const pageFromUrl = (urlParams: string): number => {
	return pageFromParamsArray(urlParams.split('/'));
}

const pageFromParamsArray = (paramVals: string[]): number => {
	const page = +paramVals.at(-1);
	if (Number.isNaN(page))
		return 1;
	else
		return page;
}

export default defineNuxtPlugin(_ => ({
	provide: {
		routeParamsFromUrl,
		routeParamsFromParamsArray,
		pageFromUrl,
		pageFromParamsArray
	}
}));