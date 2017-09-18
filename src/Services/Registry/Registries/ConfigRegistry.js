// @flow
import objectPath from 'object-path';

let instance = null;
export default class ConfigRegistry {
    _config: objectPath = objectPath({});

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    get(key: string): any {
        return this._config.get(key);
    }

    set(key: string, value: any): void {
        this._config.set(key, value);
    }

    push(key: string, value: any): void {
        this._config.push(key, value);
    }
}
