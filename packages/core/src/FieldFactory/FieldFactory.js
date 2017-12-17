// @flow
import Registry from '../Registry/Registry';
import FieldTypeAbstract from '../FieldTypeAbstract/FieldTypeAbstract';

import { type FieldType } from '../ModelAbstract/Type/FieldType';

/**
 * Field Factory class
 */
class FieldFactory {
    /**
     * Field key
     * @type {string}
     * @private
     */
    _fieldKey: string;
    /**
     * Instance FieldTypeAbstract
     * @type {FieldTypeAbstract}
     * @private
     */
    _type: FieldTypeAbstract;

    /**
     * Constructor FieldFactory
     * @param {string} fieldKey - field key
     * @param {string} type - FieldType key
     */
    constructor(fieldKey: string, type: string) {
        this.setFieldKey(fieldKey);
        this.setType(type);
    }

    /**
     * Get field
     * @returns {FieldType}
     */
    getField(): FieldType {
        return {
            field: this.getFieldKey(),
            type:  this.getType()
        };
    }

    /**
     * Set model key
     * @param {string} modelKey - model key
     * @returns {FieldFactory}
     */
    setModelKey(modelKey: string): FieldFactory {
        if (typeof modelKey === 'string') {
            this.getType().setModelKey(modelKey);
        }
        return this;
    }

    /**
     * Set field key
     * @param {string} field - field key
     * @returns {FieldFactory}
     */
    setFieldKey(field: string): FieldFactory {
        if (typeof field === 'string') {
            this._fieldKey = field;
        }
        return this;
    }

    /**
     * Get field key
     * @returns {string}
     */
    getFieldKey(): string {
        return this._fieldKey;
    }

    /**
     * Set default value
     * @param {*} defaultValue
     * @returns {FieldFactory}
     */
    setDefaultValue(defaultValue: any): FieldFactory {
        this.getType().setDefaultValue(defaultValue);
        return this;
    }

    /**
     * Set FieldType by key
     * @param {string} type - FieldType key
     * @returns {FieldFactory}
     */
    setType(type: string): FieldFactory {
        if (typeof type === 'string') {
            // this._type = new (Registry.getFieldType(type))();
            this._type = new (Registry.getRepository('FieldType').get(type))();
            this.getType().setKey(type).setField(this.getFieldKey());
        }
        return this;
    }

    /**
     * Get FieldType
     * @returns {FieldTypeAbstract}
     */
    getType(): FieldTypeAbstract {
        return this._type;
    }

    /**
     * Set title
     * @param {string} title
     * @returns {FieldFactory}
     */
    setTitle(title: string): this {
        if (typeof title === 'string') {
            this.getType().setTitle(title);
        }
        return this;
    }

    /**
     * Set disable
     * @param {boolean} isDisable
     * @returns {FieldFactory}
     */
    setDisable(isDisable: boolean): FieldFactory {
        if (typeof isDisable === 'boolean') {
            this.getType().setDisable(isDisable);
        }
        return this;
    }

    /**
     * Set options
     * @param {{}} options
     * @returns {FieldFactory}
     */
    setOptions(options: {}): FieldFactory {
        this.getType().setOptions(options);
        return this;
    }

    /**
     * Set Sequelize field
     * @param sequelizeField
     * @returns {FieldFactory}
     */
    setSequelizeField(sequelizeField: any): FieldFactory {
        this.getType().setSequelizeField(sequelizeField);
        return this;
    }
}

export default FieldFactory;
