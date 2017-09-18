// @flow
import Express from 'express';

let instance = null;
export default class ExpressRegistry {
    _app: express$Application = Express();

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    get(): express$Application {
        return this._app;
    }
}

