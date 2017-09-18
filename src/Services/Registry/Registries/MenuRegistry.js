// @flow
import lodash from 'lodash';

import type { MenuType } from '../Type/MenuType';

let instance = null;

class MenuRegistry {
    _menus: { [string]: MenuType } = {};

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    get(key: string): MenuType {
        return lodash.get(this._menus, key);
    }

    getAll(): { [string]: MenuType } {
        return this._menus;
    }

    set(key: string, menu: MenuType): void {
        lodash.set(this._menus, key, menu);
    }
}

export default MenuRegistry;
