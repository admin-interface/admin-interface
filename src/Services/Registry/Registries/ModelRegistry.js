// @flow
import lodash from 'lodash';
import Model from '../../../Shared/ModelAbstract/ModelAbstract';

let instance = null;

class ModelRegistry {
    _models: Array<Model> = [];

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    get(key: string): Model | void {
        return lodash.find(this.getAll(), (model: Model) => model.getKey() === key);
    }

    getAll(): Array<Model> {
        return this._models;
    }

    getByTableName(tableName: string): Model | void {
        return lodash.find(this.getAll(), (model: Model) => model.getModel().tableName === tableName);
    }

    set(model: Model): void {
        if (!this.get(model.getKey())) {
            this._models.push(model);
        }
    }

    hasModel(key: string): boolean {
        return !!this.get(key);
    }
}

export default ModelRegistry;
