/**
 * @module src/Controller/ModelController/API/APIModelController
 * @flow
 */
import lodash from 'lodash';
import { Registry, Column, Utils } from 'admin-interface-core';

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
        const Columns: Array<Column> = Model.getColumns();

        const refModel: string    = req.query.refModel;
        const refModelKey: string = req.query.refModelKey;

        const dataTableColumns: Array<DataTableColumnType> = req.query.columns;
        const dataTableOrder: Array<DataTableOrderType>    = req.query.order;


        // Reference
        const byReference: DataTableByReference = {
            table: '',
            value: refModelKey
        };
        if (refModel) {
            const refModelObject = Registry.getRepository('Model').get(refModel);
            if (refModelObject) {
                byReference.table = refModelObject.getModel().tableName;
            }
        }

        // Search string
        const search: Array<DataTableSearch> = dataTableColumns
            .filter(e => e.search.value)
            .map(e => ({ column: +e.data, value: e.search.value }));

        // Order params
        const orderBy: DataTableOrderType = dataTableOrder[ 0 ];
        const order: Array<Array<any>>    = Utils.formatOrder(
            Columns[ orderBy.column ],
            orderBy.dir.toLocaleUpperCase()
        );

        // Pagination params
        const query: DataTablePagination = {
            limit:  +req.query.length || 10,
            offset: +req.query.start || 0
        };

        try {
            // Reference where
            const whereByReference  = Utils.getReferenceWhere(Model, byReference);
            // Get items
            const { rows, count }   = await Model.getModel().findAndCountAll(
                Utils.formatQueryModelList(Model, order, query, search, whereByReference)
            );
            // Records total
            const recordsTotal      = await Model.getModel().count(whereByReference ? {
                where: whereByReference
            } : null);
            const itemsArrayPromise = rows.map(_item => {
                const item   = _item.get();
                const fields = Columns.map(async (column: Column) => {
                    // reference
                    if (column.getReferenceKey()) {
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
    const modelKey: string           = req.params.model_key;
    const itemId: string             = req.params.id;
    const body: { [string]: string } = req.body;
    const Model                      = Registry.getRepository('Model').get(modelKey);

    if (Model) {
        // Filter body
        const fields = {};
        Object.keys(body).forEach((key: string) => {
            if (Model.getFieldByKey(key)) {
                fields[ key ] = body[ key ];
            }
        });

        try {
            // Get item
            const item = await Model.getModel().findById(itemId);

            if (!item) {
                return next(new ErrorResponse(`Not found item by id: ${ itemId }`, 404, true));
            }

            // Update item
            const updatedStatus = await item.update(fields);

            // Send status
            res.json(updatedStatus);
        } catch (err) {
            return next(err);
        }
    }
    return next(new ErrorResponse(`Not found Model by key ${ modelKey }`, 404, true));
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
    const modelKey: string = req.params.model_key;
    const itemId: string   = req.params.id;
    const Model            = Registry.getRepository('Model').get(modelKey);

    if (Model) {
        try {
            const primaryKey = Model.getPrimaryKey();
            if (primaryKey) {
                const deleteStatus = await Model.getModel().destroy({
                    where: { [ primaryKey ]: itemId }
                });

                if (!deleteStatus) {
                    return next(new ErrorResponse(`Not found item by id: ${ itemId }`, 404, true));
                }

                const redirect = getLinkModelList(Model.getKey());

                return res.json({
                    deleteStatus,
                    redirect
                });
            }
            return next(new ErrorResponse(`Primary Key not found by model key: ${ modelKey }`, 500, true));
        } catch (err) {
            return next(err);
        }
    }
    return next(new ErrorResponse(`Not found Model by key ${ modelKey }`, 404, true));
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
    const modelKey: string = req.params.model_key;
    const body             = req.body;
    const Model            = Registry.getRepository('Model').get(modelKey);

    if (Model) {
        const primaryKey = Model.getPrimaryKey();
        if (primaryKey) {
            // Filter attributes
            const attributes = lodash.pickBy(body, (value: any, key: string) => key !== primaryKey);

            try {
                // Create a new item
                const item     = await Model.getModel().create(attributes);
                // Get link to the item
                const redirect = getLinkModelSingle(Model.getKey(), item[ Model.getPrimaryKey() ]);

                return res.json({
                    item,
                    redirect
                });
            } catch (err) {
                return next(err);
            }
        }
    }
    return next(new ErrorResponse(`Not found Model by key ${ modelKey }`, 404, true));
}
