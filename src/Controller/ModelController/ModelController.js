/**
 * @module src/Controller/ModelController/ModelController
 * @flow
 */
import Registry from '../../Services/Registry/ProxyInterface';
import ErrorResponse from '../../Utils/ErrorResponse/ErrorResponse';

/**
 * Get list page
 * @param {express$Request} req
 * @param {express$Response} res
 * @param {express$NextFunction} next
 * @return {express$Response}
 */
export function getList(req: express$Request, res: express$Response, next: express$NextFunction) {
    const modelKey: string = req.params.model_key;
    const Model            = Registry.getModel(modelKey);

    if (Model) {
        try {
            return res.render('model/list1', {
                Model
            });
        } catch (err) {
            next(err);
        }
    }
    return next(new ErrorResponse(`Not found Model by key ${ modelKey }`, 404));
}

/**
 * Get single page
 * @async
 * @function
 * @param {express$Request} req
 * @param {express$Response} res
 * @param {express$NextFunction} next
 * @returns {Promise.<express$Response>}
 */
export async function getSingleModel(req: express$Request, res: express$Response, next: express$NextFunction) {
    const modelKey = req.params.model_key;
    const itemId   = req.params.id;
    const Model    = Registry.getModel(modelKey);

    if (Model) {
        const References = Model.getReferences()
            .map((reference: string) => Registry.getModel(reference));

        try {
            const item = await Model.getModel().findById(itemId);

            if (!item) {
                return next(new ErrorResponse(`Not found item by id: ${ itemId }`, 404));
            }

            return res.render('model/single', {
                Model,
                References,
                item
            });
        } catch (err) {
            next(err);
        }
    }
    return next(new ErrorResponse(`Not found Model by key ${ modelKey }`, 404));
}
