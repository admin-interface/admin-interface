// @flow
import PageAbstract from '../../../Shared/PageAbstract/PageAbstract';
import Model from '../../../Shared/ModelAbstract/ModelAbstract';
import Registry from '../../../Services/Registry/ProxyInterface';
import { WidgetFactory } from '../../../Shared/WidgetFactory/WidgetFactory';

/**
 * Home Page
 * @extends PageAbstract
 */
class HomePage extends PageAbstract {
    /**
     * Get page URL
     * @returns {string}
     */
    getUrl() { // eslint-disable-line class-methods-use-this
        return '/';
    }

    /**
     * Get page widgets
     * @returns {Array<WidgetAbstract>}
     */
    getWidgets() { // eslint-disable-line class-methods-use-this
        return [
            WidgetFactory('ModelsInfoWidget')
                .setTitle('Models Info Widget')
                .setOptions({
                    models: Registry.getAllModel().map((model: Model) => ({
                        model: model.getKey()
                    }))
                })
        ];
    }

    /**
     * Render page.
     * Express controller
     * @param {express$Request} req
     * @param {express$Response} res
     */
    render(req: express$Request, res: express$Response): void {
        res.render('pages/main', {
            $page: this
        });
    }
}

export default HomePage;
