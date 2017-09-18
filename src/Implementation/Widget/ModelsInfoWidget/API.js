// @flow
import Registry from '../../../Services/Registry/ProxyInterface';

/**
 * Controller
 */
const Controller = {
    /**
     * Get models information: list url and count
     * @param {express$Request} req
     * @param {express$Response} res
     */
    async getModelsInfo(req: express$Request, res: express$Response) {
        const modelsKey = JSON.parse(req.query.models);
        const promises  = modelsKey.map(async (modelKey: string) => {
            const Model = Registry.getModel(modelKey);
            if (Model) {
                const count = await Model.getModel().count();
                return { count, model: modelKey };
            }
        });

        Promise.all(promises)
            .then(result => res.json(result));
    }
};

export default Controller;
