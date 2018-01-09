// @flow

/**
 * @typedef FilterHandlerType
 */
export type FilterHandlerType = (args: any) => void;

/**
 * @typedef FilterType
 */
export type FilterType = {
    filterName: string,
    handler: FilterHandlerType,
    priority: number
}

