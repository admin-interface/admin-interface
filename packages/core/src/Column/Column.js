// @flow
import { IColumn } from './IColumn';

/**
 * Column class
 * @implements IColumn
 */
class Column implements IColumn {
    /**
     * Title column
     * @type {string}
     * @private
     */
    _title: string;
    /**
     * Is it sorting this column
     * @type {boolean}
     * @private
     */
    _sorting: boolean = true;
    /**
     * Model field key
     * @type {string}
     * @private
     */
    _modelField: string;
    /**
     * Reference model key
     * @type {strong}
     * @private
     */
    _modelReference: string;
    /**
     * Reference model key item
     * @type {string}
     * @private
     */
    _modelReferenceKey: string;
    /**
     * Static value
     * @type {*}
     * @private
     */
    _value: any;

    /**
     * Set title column
     * @param {string} title
     * @returns {Column}
     */
    setTitle(title: string): Column {
        if (typeof title === 'string') {
            this._title = title;
        }
        return this;
    }

    /**
     * Get title column
     * @returns {string}
     */
    getTitle(): string {
        return this._title;
    }

    /**
     * Set the sorting
     * @param {boolean} sorting
     * @returns {Column}
     */
    setSorting(sorting: boolean = true): Column {
        if (typeof sorting === 'boolean') {
            this._sorting = sorting;
        }
        return this;
    }

    /**
     * Get the sorting
     * @returns {boolean}
     */
    getSorting(): boolean {
        return this._sorting;
    }

    /**
     * Set the model field
     * @param {string} field
     * @returns {Column}
     */
    setField(field: string): Column {
        if (typeof field === 'string') {
            this._modelField = field;
        }
        return this;
    }

    /**
     * Get the model field
     * @returns {string}
     */
    getField(): string {
        return this._modelField;
    }

    /**
     * Set the key for reference of model
     * @param {string} reference
     * @returns {Column}
     */
    setReference(reference: string): Column {
        if (typeof reference === 'string') {
            this._modelReference = reference;
        }
        return this;
    }

    /**
     * Get the key for reference of model
     * @returns {string}
     */
    getReference(): string {
        return this._modelReference;
    }

    /**
     * Set the field for reference of model
     * @param key
     * @returns {Column}
     */
    setReferenceKey(key: string): Column {
        if (typeof key === 'string') {
            this._modelReferenceKey = key;
        }
        return this;
    }

    /**
     * Get the field for reference of model
     * @returns {string}
     */
    getReferenceKey(): string {
        return this._modelReferenceKey;
    }

    /**
     * Set the field and reference of model
     * @param {string} key
     * @param {string} reference
     * @returns {Column}
     */
    setReferenceAndKey(key: string, reference: string): Column {
        this.setReferenceKey(key);
        this.setReference(reference);
        return this;
    }

    /**
     * Set the value field
     * @param {*} value
     * @returns {Column}
     */
    setValue(value: any): Column {
        // disable sorting
        this.setSorting(false);

        this._value = value;
        return this;
    }

    /**
     * Get the value field
     * @async
     * @param {*} item
     * @returns {Promise.<*>}
     */
    async getValue(item: any): any {
        if (item && typeof this._value === 'function') {
            const value = await this._value(item);
            return value;
        }
        return this._value;
    }

    /**
     * Check is empty value
     * @returns {boolean}
     */
    isEmptyValue(): boolean {
        return !this._value;
    }
}

export default Column;
