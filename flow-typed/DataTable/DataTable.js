// @flow

/**
 * @typedef DataTableOrderType
 */
export type DataTableOrderType = {
    column: number,
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
    table?: string,
    value?: string
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
