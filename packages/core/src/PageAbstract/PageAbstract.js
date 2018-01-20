// @flow
import WidgetAbstract from '../WidgetAbstract/WidgetAbstract';
import type { IPage } from './IPage';

/**
 * Page Abstract class
 * @implements IPage
 */
class PageAbstract implements IPage {
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
     * Controller
     */
    render(req: express$Request, res: express$Response): void { // eslint-disable-line class-methods-use-this, no-unused-vars
        throw new Error('Method the render is abstract');
    }
}

export default PageAbstract;
