type TConfig = typeof import('@/config')['default'];

type ParamVarKeys = keyof TConfig;
type ParamVarVals = TConfig[ParamVarKeys][number];

type QueryParams = { [ParamKey in ParamVarKeys]: TConfig[ParamKey][number]; }

interface IPageNav {
	currPage: number;
	nPages: number;
	pageNavLabels: number[];
	showIncrement: boolean;
	showDecrement: boolean;
}

interface INav extends QueryParams {
	to: string;
}

interface IFilter {
	key: ParamVarKeys;
	vals: ParamVarVals;
}

type ImageQualities = TConfig["imageQualities"][number];