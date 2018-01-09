// @flow

import type { FilterHandlerType, FilterType } from './types';

/**
 * Filter class
 */
class Filter {
    /**
     * Filters
     * @type {Array}
     * @private
     */
    _filters: Array<FilterType> = [];

    /**
     * Add filter
     * @param {string} filterName
     * @param {FilterHandlerType} handler
     * @param {number} priority
     * @param {any} context
     */
    addFilter(filterName: string, handler: FilterHandlerType, priority: number = 10, context?: any): void {
        const filter = {
            filterName,
            handler: handler.bind(context || handler),
            priority
        };

        this.setFilter(filter);
    }

    /**
     * Apply filter
     * @param {string} filterName - Filter name
     * @param {any} data - Data for filtration
     * @returns {any}
     */
    applyFilter(filterName: string, data: any): any {
        let _data     = data;
        this.getFiltersByName(filterName).forEach(filter => {
            _data = filter.handler(_data);
        });
        return _data;
    }

    /**
     * Set filter
     * @private
     * @param {FilterType} filter
     * @returns {Filter}
     */
    setFilter(filter: FilterType): Filter {
        this._filters.push(filter);
        return this;
    }

    /**
     * Get all filters
     * @private
     * @returns {Array<FilterType>}
     */
    getAllFilter(): Array<FilterType> {
        return this._filters;
    }

    /**
     * Get filters by name
     * @private
     * @param filterName
     * @returns {Array<FilterType>}
     */
    getFiltersByName(filterName: string): Array<FilterType> {
        return this.getAllFilter()
            .sort((a, b) => Number(a.priority > b.priority))
            .filter(filter => filter.filterName === filterName);
    }
}

export default Filter;
