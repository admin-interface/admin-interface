// @flow
import lodash from 'lodash';
import PageAbstract from '../../../Shared/PageAbstract/PageAbstract';

let instance = null;

class PageRegistry {
    _pages: Array<PageAbstract> = [];

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    get(key: string): PageAbstract | void {
        return lodash.find(this._pages, (page: PageAbstract) => page.getKey() === key);
    }

    getAll(): Array<PageAbstract> {
        return this._pages;
    }

    set(page: PageAbstract): void {
        if (!this.get(page.getKey())) {
            this._pages.push(page);
        }
    }
}

export default PageRegistry;
