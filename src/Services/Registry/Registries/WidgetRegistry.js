// @flow
import lodash from 'lodash';

import WidgetAbstract from '../../../Shared/WidgetAbstract/WidgetAbstract';

let instance = null;
export default class WidgetRegistry {
    _widgets: { [string]: typeof WidgetAbstract } = {};

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    get(key: string): typeof WidgetAbstract {
        return lodash.get(this._widgets, key);
    }

    getAll(): { [string]: typeof WidgetAbstract } {
        return this._widgets;
    }

    set(key: string, value: typeof WidgetAbstract): void {
        lodash.set(this._widgets, key, value);
    }
}
