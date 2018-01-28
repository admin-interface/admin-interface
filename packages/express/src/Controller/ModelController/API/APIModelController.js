/**
 * @module src/Controller/ModelController/API/APIModelController
 * @flow
 */
import lodash from 'lodash';
import { Registry, Column, Container } from '@admin-interface/core';
import type {
    DataTableColumnType,
    DataTableOrderType,
    DataTableByReference,
    DataTableSearch,
    DataTablePagination
} from '@admin-interface/core';

import ErrorResponse from '../../../Utils/ErrorResponse/ErrorResponse';
import { getLinkModelSingle, getLinkModelList } from '../../../Utils/View/LinkType/ModelView';
import { getLinkApiModelDelete } from '../../../Utils/View/LinkType/ModelAPI';

/**
 * Get list item
 * @async
 * @function
 * @param {express$Request} req
 * @param {express$Response} res
 * @param {express$NextFunction} next
 * @returns {Promise.<*>}
 */
export async function getApiList(req: express$Request, res: express$Response, next: express$NextFunction) {
    const modelKey: string = req.params.model_key;

    const Model = Registry.getRepository('Model').get(modelKey);
    if (Model) {
        const dataTable = Container.resolve('DataTable');
        const modelManager = Container.resolve('ModelManager');

        modelManager.setModel(Model);

        if (req.query.refModel && req.query.refModelKey) {
            modelManager.setReference(req.query.refModel, req.query.refModelKey);
        }


        // const Columns: Array<Column> = Model.getColumns();

        const dataTableOrder: Array<DataTableOrderType>    = req.query.order;

        req.query.columns
            .forEach(column => dataTable.setColumn(column));

        req.query.order
            .forEach(order => dataTable.setOrder(Model.getColumns()[ order.column ], order.dir));

        // Reference
        // const byReference: DataTableByReference = {
        //     table: '',
        //     value: refModelKey
        // };
        // if (refModel) {
        //     const refModelObject = Registry.getRepository('Model').get(refModel);
        //     if (refModelObject) {
        //         byReference.table = refModelObject.getModel().tableName;
        //     }
        // }

        // Search string
        // const search: Array<DataTableSearch> = dataTableColumns
        //     .filter(e => e.search.value)
        //     .map(e => ({ column: +e.data, value: e.search.value }));

        // Order params
        // const orderBy: DataTableOrderType = dataTableOrder[ 0 ];
        // const order: Array<Array<any>>    = formatOrder(
        //     Columns[ orderBy.column ],
        //     orderBy.dir.toLocaleUpperCase()
        // );

        // Pagination params
        const query: DataTablePagination = {
            limit:  +req.query.length || 10,
            offset: +req.query.start || 0
        };

        try {
            // Reference where
            const whereByReference  = getReferenceWhere(Model, byReference);
            // Get items
            const { rows, count }   = await Model.getModel().findAndCountAll(
                formatQueryModelList(Model, order, query, search, whereByReference)
            );
            // Records total
            const recordsTotal      = await Model.getModel().count(whereByReference ? {
                where: whereByReference
            } : null);
            const itemsArrayPromise = rows.map(_item => {
                const item   = _item.get();
                const fields = Columns.map(async (column: Column) => {
                    // reference
                    if (column.getReferenceKey() && item[ column.getReference() ]) {
                        return item[ column.getReference() ][ column.getReferenceKey() ];
                    }
                    // value
                    if (!column.isEmptyValue()) {
                        const value = await column.getValue(item);
                        return value;
                    }
                    // model field
                    return item[ column.getField() ];
                });

                // Add data for action buttons
                if (Model.isShowActions()) {
                    fields.push(getLinkModelSingle(Model.getKey(), item[ Model.getPrimaryKey() ]));
                    fields.push(getLinkApiModelDelete(Model.getKey(), item[ Model.getPrimaryKey() ]));
                }

                return fields;
            });

            const itemsArray = await Promise.all(itemsArrayPromise.map(item => Promise.all(item)));

            return res.json({
                data:            itemsArray,
                draw:            req.query.draw,
                recordsFiltered: count,
                recordsTotal
            });
        } catch (err) {
            return next(err);
        }
    }
    return next(new ErrorResponse(`Not found Model by key ${ modelKey }`, 404, true));
}


/**
 * Update a item of model
 * @async
 * @function
 * @param req
 * @param res
 * @param next
 * @returns {Promise.<*>}
 */
export async function putUpdateSingleModel(req: express$Request, res: express$Response, next: express$NextFunction) {
    const model = Registry.getRepository('Model').get(req.params.model_key);

    if (model) {
        const modelManager = Container.resolve('ModelManager');

        try {
            // Update item
            const updatedStatus = await modelManager.setModel(model).update(req.params.id, req.body);
            // Send status
            res.json(updatedStatus);
        } catch (err) {
            return next(err);
        }
    }
    return next(new ErrorResponse(`Not found Model by key ${ req.params.model_key }`, 404, true));
}

/**
 * Delete single item of model
 * @async
 * @function
 * @param {express$Request} req
 * @param {express$Response} res
 * @param {express$NextFunction} next
 * @returns {Promise.<*>}
 */
export async function deleteSingleModel(req: express$Request, res: express$Response, next: express$NextFunction) {
    const model = Registry.getRepository('Model').get(req.params.model_key);

    if (model) {
        const modelManager = Container.resolve('ModelManager');

        try {
            // Delete item
            const deleteStatus = await modelManager.setModel(model).delete(req.params.id);
            if (!deleteStatus) {
                return next(new ErrorResponse(`Not found item by id: ${ req.params.id }`, 404, true));
            }

            // Get link to model list
            const redirect = getLinkModelList(model.getKey());
            return res.json({
                deleteStatus,
                redirect
            });
        } catch (err) {
            return next(err);
        }
    }
    return next(new ErrorResponse(`Not found Model by key ${ req.params.model_key }`, 404, true));
}

/**
 * Create new a item of model
 * @async
 * @function
 * @param {express$Request} req
 * @param {express$Response} res
 * @param {express$NextFunction} next
 * @returns {Promise.<*>}
 */
export async function postApiCreateSingleModel(req: express$Request, res: express$Response, next: express$NextFunction) {
    const model = Registry.getRepository('Model').get(req.params.model_key);

    if (model) {
        const modelManager = Container.resolve('ModelManager');

        try {
            // Create a new item
            const item = await modelManager.setModel(model).create(req.body);
            // Get link to the item
            const redirect = getLinkModelSingle(model.getKey(), item[ model.getPrimaryKey() ]);

            return res.json({
                item,
                redirect
            });
        } catch (err) {
            return next(err);
        }
    }
    return next(new ErrorResponse(`Not found Model by key ${ req.params.model_key }`, 404, true));
}
