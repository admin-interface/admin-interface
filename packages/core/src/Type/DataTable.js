// @flow
import Column from '../Column/Column';

/**
 * @typedef DataTableOrderType
 */
export type DataTableOrderType = {
    column: Column,
    dir: string
}

/**
 * @typedef DataTableColumnType
 */
export type DataTableColumnType = {
    data: string,
    name: string,
    searchable: string,
    orderable: string,
    search: {
        value: string,
        regex: string
    }
}

/**
 * @typedef DataTableByReference
 */
export type DataTableByReference = {
    table: string,
    property: string
}

/**
 * @typedef DataTablePagination
 */
export type DataTablePagination = {
    limit: number,
    offset: number
}

export type DataTableSearch = {
    column: number,
    value: string
};
