// @flow
import Registry from '../../Services/Registry/ProxyInterface';
import ErrorResponse from '../../Utils/ErrorResponse/ErrorResponse';

export function checkHasModel(req: express$Request, res: express$Response, next: express$NextFunction) {
    const modelKey: string = req.params.model_key;
    if (!Registry.hasModel(modelKey)) { // if exist a model
        return next(new ErrorResponse(`Not found Model by key ${ modelKey }`, 404));
    }
    return next();
}

export function checkHasRefModel(req: express$Request, res: express$Response, next: express$NextFunction) {
    const modelKey: string    = req.params.model_key;
    const refModelKey: string = req.query.refModel;

    if (refModelKey) { // if exist a reference model
        const RefModel = Registry.getModel(refModelKey);
        if (RefModel && RefModel.getReferences().indexOf(modelKey) === false) {
            return next(new ErrorResponse(`Not found Reference Model by key ${ modelKey }`, 404));
        }
    }
    return next();
}
