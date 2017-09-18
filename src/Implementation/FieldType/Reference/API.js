// @flow
import Registry from '../../../Services/Registry/ProxyInterface';

/**
 * Reference API Controller.
 */
const Controller = {
    /**
     * API Action.
     * Get selected item
     * @param {express$Request} req
     * @param {express$Response} res
     * @param {express$NextFunction} next
     * @returns {Promise.<void>}
     */
    async getSelected(req: express$Request, res: express$Response, next: express$NextFunction) {
        const reference = JSON.parse(req.query.reference);
        const selected  = req.query.selected;
        const label     = req.query.label;
        const Model     = Registry.getModelByTableName(reference.model);

        if (Model) {
            const key = reference.key || Model.getPrimaryKey();
            if (key) {
                try {
                    const item = await Model.getModel().findOne({
                        where: {
                            [ key ]: selected
                        }
                    });

                    return res.json({
                        text:  item[ label ],
                        value: item[ key ]
                    });
                } catch (err) {
                    return next(err);
                }
            }
        }
        return next();
    },

    async getItems(req: express$Request, res: express$Response, next: express$NextFunction) {
        const reference = JSON.parse(req.query.reference);
        const search    = req.query.q || '';
        const Model     = Registry.getModelByTableName(reference.model);

        if (Model) {
            const key = req.query.key || Model.getPrimaryKey();
            if (key) {
                const label = req.query.label !== 'undefined' ? req.query.label : key;
                try {
                    const items = await Model.getModel().findAll({
                        limit: 10,
                        where: {
                            $or: {
                                [ label ]: {
                                    $like: `%${ search }%`
                                },
                                [ key ]:   {
                                    $like: `${ search }`
                                }
                            }
                        }
                    });

                    const result = items.map(field => ({
                        text:  field[ label ],
                        value: field[ key ]
                    }));

                    return res.json(result);
                } catch (err) {
                    return next(err);
                }
            }
        }
        return next();
    }
};

export default Controller;
