// @flow
import type { FilterHandlerType } from './FilterHandlerType';

/**
 * @typedef FilterType
 */
export type FilterType = {
    filterName: string,
    handler: FilterHandlerType,
    priority: number
}
