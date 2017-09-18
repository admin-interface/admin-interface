// @flow
import Model from './ModelAbstract';

/**
 * Model Builder
 */
class ModelBuilder {
    /**
     * Instance model
     * @type {Model}
     * @private
     */
    _model: Model;

    /**
     * @param {ModelInterface} model - object abstract model
     */
    constructor(model: typeof Model) {
        this._model = new model();

        if (!(this._model instanceof Model)) {
            throw new TypeError('Expected instance of Model');
        }
    }

    /**
     * Get model
     * @returns {Model}
     */
    getModel(): Model {
        return this._model;
    }

    /**
     * Set key
     * @param {string} key
     * @returns {ModelBuilder}
     */
    setKey(key: string): this {
        this._model.setKey(key);

        return this;
    }

    /**
     * Build model and get model
     * @returns {Model}
     */
    build(): Model {
        this._model.setFields();
        this._model.setColumns();
        this._model.setReferences();

        return this.getModel();
    }
}

export default ModelBuilder;
