/**
 * @module src/Utils/Sequelize/Query
 * @flow
 */
import lodash from 'lodash';
import Model from '../../ModelAbstract/ModelAbstract';
import Column from '../../Column/Column';
import type {
    DataTableByReference,
    DataTablePagination,
    DataTableSearch
} from '../../Type/DataTable';

/**
 * Get reference "Where" object
 * @param {Model} model
 * @param {DataTableByReference} byReference
 * @returns {{}|null}
 */
export function getReferenceWhere(model: Model, byReference: DataTableByReference): { [string]: any } | null {
    if (byReference && byReference.table && byReference.value) {
        const fieldReference = Object.keys(model.getModel().attributes).filter((key: string) => {
            const attribute = model.getModel().attributes[ key ];
            return (
                attribute.references &&
                attribute.references.model &&
                attribute.references.model === byReference.table
            );
        });
        if (fieldReference.length) {
            return { [ fieldReference[ 0 ] ]: byReference.value };
        }
    }
    return null;
}

/**
 * Get format query model
 * @param {Model} model
 * @param {Array<Array<*>>} order
 * @param {DataTablePagination} params
 * @param {Array<DataTableSearch>} search
 * @param {{any}|null} byReference
 */
export function formatQueryModelList(model: Model,
                                     order: Array<Array<any>>,
                                     params: DataTablePagination = { limit: 10, offset: 0 },
                                     search: DataTableSearch[],
                                     byReference?: { [string]: any } | null): Object {
    const query        = lodash.merge(
        {
            attributes: [],
            order,
            include:    []
        },
        params
    );
    const modelColumns = model.getColumns();

    // Reference
    if (byReference) {
        query.where = byReference;
    }

    // Connect references
    query.include = lodash.uniq(
        modelColumns.filter(column => column.getReference()).map(column => ({
            association: column.getReference(),
            as:          column.getReference()
        }))
    );

    // Search
    if (search.length) {
        const whereSearch = {};
        search.forEach(searchParam => {
            const column = modelColumns[ searchParam.column ];

            // Reference
            if (column.getReference()) {
                query.include = query.include.map(e => {
                    if (e.association === column.getReference()) {
                        e.where = {
                            [ column.getReferenceKey() ]: {
                                $like: `${ searchParam.value }%`
                            }
                        };
                    }
                    return e;
                });
            } else if (column.getField() && column.isEmptyValue()) {
                whereSearch[ column.getField() ] = {
                    $like: `${ searchParam.value }%`
                };
            }
        });
        if (Object.keys(whereSearch).length) {
            query.where = lodash.merge(query.where, { $or: whereSearch });
        }
    }

    // connect attributes
    query.attributes = modelColumns
        .filter(column => column.getField() && !column.getReference() && column.isEmptyValue())
        .map(column => column.getField());

    // set primary key
    const primaryKey = model.getPrimaryKey();
    if (primaryKey && query.attributes.indexOf(primaryKey) === -1) {
        query.attributes.push(primaryKey);
    }

    return query;
}

/**
 * Get format order object
 * @param {Column} column
 * @param {string} orderBy
 * @returns {Array<*>}
 */
export function formatOrder(column: Column, orderBy: string): Array<Array<any>> {
    if (column.getReference()) {
        return [
            [
                {
                    association: column.getReference(),
                    as:          column.getReference()
                },
                `${ column.getReference() }.${ column.getReferenceKey() }`,
                orderBy
            ]
        ];
    }
    return [ [ column.getField(), orderBy ] ];
}
