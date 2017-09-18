// @flow
import { PageInterface } from './Interface/PageInterface';
import WidgetAbstract from '../WidgetAbstract/WidgetAbstract';

/**
 * Page Abstract class
 * @implements PageInterface
 */
class PageAbstract implements PageInterface<PageAbstract> {
    /**
     * Page key
     * @type {string}
     * @private
     */
    _key: string;

    /**
     * Set page key
     * @param {string} key
     * @returns {PageAbstract}
     */
    setKey(key: string): PageAbstract {
        if (typeof key === 'string') {
            this._key = key;
        }
        return this;
    }

    /**
     * Get page key
     * @returns {string}
     */
    getKey(): string {
        return this._key;
    }

    /**
     * Get page URL
     * @returns {string}
     */
    getUrl(): string { // eslint-disable-line class-methods-use-this
        throw new Error('Implement the method getUrl');
    }

    /**
     * Get page widgets
     * @returns {Array<WidgetAbstract>}
     */
    getWidgets(): Array<WidgetAbstract> { // eslint-disable-line class-methods-use-this
        return [];
    }

    /**
     * Render page.
     * Express controller
     * @param {express$Request} req
     * @param {express$Response} res
     * @param {express$NextFunction} next
     */
    render(req: express$Request, res: express$Response, next: express$NextFunction): mixed { // eslint-disable-line no-unused-vars
        res.render('pages/main', {
            $page: this
        });
    }
}

export default PageAbstract;
