// @flow
import { Model as SequelizeModel } from 'sequelize';
import lodash from 'lodash';

import FieldFactory from '../FieldFactory/FieldFactory';
import Registry from '../../Services/Registry/ProxyInterface';
import Column from '../Column/Column';
import Tab from '../Tab/Tab';

import { ModelInterface } from './Interface/ModelInterface';
import { type FieldType } from './Type/FieldType';

/**
 * Model Abstract class
 */
class ModelAbstract implements ModelInterface<ModelAbstract> {
    /**
     * Model key
     * @type {string}
     * @private
     */
    _key: string;
    /**
     * Fields
     * @type {Array<FieldType>}
     * @private
     */
    _fields: Array<FieldType>  = [];
    /**
     * Columns
     * @type {Array<Column>}
     * @private
     */
    _columns: Array<Column>    = [];
    /**
     * Tabs
     * @type {Array<Tab>}
     * @private
     */
    _tabs: Array<Tab>          = [];
    /**
     * References
     * @type {Array<string>}
     * @private
     */
    _references: Array<string> = [];

    /**
     * Abstract method.
     * Get Sequelize model
     * @returns {SequelizeModel}
     * @abstract
     */
    getModel(): SequelizeModel { // eslint-disable-line class-methods-use-this
        throw new TypeError('The getModel abstract method');
    }

    /**
     * Get model key
     * @return {string}
     */
    getKey(): string {
        return this._key;
    }

    /**
     * Set model key
     * @param key
     * @return {ModelAbstract}
     */
    setKey(key: string): ModelAbstract {
        if (typeof key === 'string') {
            this._key = key;
        } else {
            throw new Error('key not string');
        }
        return this;
    }

    /**
     * Set field
     * @param {FieldType} field
     * @returns {ModelAbstract}
     */
    setField(field: FieldType): ModelAbstract {
        this._fields.push(field);
        return this;
    }

    /**
     * Get all fields
     * @returns {Array<FieldType>}
     */
    getFields(): Array<FieldType> {
        return this._fields;
    }

    /**
     * Get field by key
     * @param {string} key - field key
     * @param {Array<FieldType>} registry
     * @returns {FieldType|void}
     */
    getFieldByKey(key: string, registry?: Array<FieldType>): FieldType | void {
        if (registry && registry.length) {
            return lodash.find(registry, [ 'field', key ]);
        }
        return lodash.find(this.getFields(), [ 'field', key ]);
    }

    /**
     * Set column
     * @param {Column} column
     * @returns {ModelAbstract}
     */
    setColumn(column: Column): ModelAbstract {
        if (column instanceof Column) {
            this._columns.push(column);
        }
        return this;
    }

    /**
     * Get columns
     * @returns {Array<Column>}
     */
    getColumns(): Array<Column> {
        return this._columns;
    }

    /**
     * Set tab
     * @param {Tab} tab
     * @returns {ModelAbstract}
     */
    setTab(tab: Tab): ModelAbstract {
        if (tab instanceof Tab) {
            this._tabs.push(tab);
        }
        return this;
    }

    /**
     * Get tabs
     * @returns {Array<Tab>}
     */
    getTabs(): Array<Tab> {
        return this._tabs;
    }

    /**
     * Set reference
     * @param {string} reference
     * @returns {ModelAbstract}
     */
    setReference(reference: string): ModelAbstract {
        if (typeof reference === 'string' && Registry.hasModel(reference)) {
            this._references.push(reference);
        }
        return this;
    }

    /**
     * Get references
     * @returns {Array<string>}
     */
    getReferences(): Array<string> {
        return this._references;
    }

    /**
     * Show actions button
     * @returns {boolean}
     */
    isShowActions(): boolean { // eslint-disable-line class-methods-use-this
        return true;
    }

    /**
     * Get primary key
     * @returns {string|null}
     */
    getPrimaryKey(): string | null {
        const attributes = this.getModel().attributes;
        // eslint-disable-next-line no-restricted-syntax
        for (const key: string in attributes) {
            if (attributes.hasOwnProperty(key)) {
                if (lodash.hasIn(attributes[ key ], 'primaryKey')) {
                    return key;
                }
            }
        }
        return null;
    }

    /**
     * Get singular model name
     * @returns {string}
     */
    getNameSingular(): string {
        return this.getModel().options.name.singular;
    }

    /**
     * Get plural model name
     * @returns {string}
     */
    getNamePlural(): string {
        return this.getModel().options.name.plural;
    }

    /**
     * Get strategy for fields
     * @returns {Array<FieldFactory>}
     */
    getFieldsStrategy(): Array<FieldFactory> { // eslint-disable-line class-methods-use-this
        return [];
    }

    /**
     * Get strategy for columns
     * @returns {Array<Column>}
     */
    getColumnsStrategy(): Array<Column> { // eslint-disable-line class-methods-use-this
        return [];
    }

    /**
     * Get strategy for tabs
     * @returns {Array<Tab>}
     */
    getTabsStrategy(): Array<Tab> { // eslint-disable-line class-methods-use-this
        return [];
    }

    /**
     * Get reference strategy
     * @returns {Array<string>} - models keys
     */
    getReferencesStrategy(): Array<string> { // eslint-disable-line class-methods-use-this
        return [];
    }

    /**
     * Get fields from sequelize attributes
     * @returns {Array<FieldType>}
     */
    getFieldsFromAttributes(): Array<FieldType> {
        const attributes = this.getModel().attributes;

        return Object.keys(attributes).map((key: string) => {
            const sequelizeField = attributes[ key ];

            return new FieldFactory(key, lodash.capitalize(sequelizeField.type.constructor.name))
                .setModelKey(this.getKey())
                .setSequelizeField(sequelizeField)
                .setTitle(lodash.startCase(sequelizeField.fieldName))
                .setDisable(this.getPrimaryKey() === key)
                .setDefaultValue(sequelizeField.defaultValue || '')
                .getField();
        });
    }

    /**
     * Build Fields
     */
    buildFields(): void {
        this.getFieldsFromAttributes().forEach((fieldType: FieldType) =>
            this.setField(fieldType)
        );
    }

    /**
     * Build fields from user strategy
     */
    buildFieldsByStrategy(): void {
        const attributes = this.getModel().attributes;

        this.getFieldsStrategy().forEach((fieldObject: FieldFactory) => {
            const sequelizeField = attributes[ fieldObject.getFieldKey() ];
            const field          = fieldObject
                .setSequelizeField(sequelizeField)
                .setModelKey(this.getKey())
                .getField();

            this.setField(field);
        });
    }

    /**
     * Set fields.
     * Protected method
     */
    setFields(): void {
        if (this.getFieldsStrategy().length) {
            return this.buildFieldsByStrategy();
        }
        return this.buildFields();
    }

    /**
     * Build columns
     */
    buildColumns(): void {
        this.getFieldsFromAttributes().forEach((fieldType: FieldType) => {
            const _fieldType = this.getFieldByKey(fieldType.field, this.getFieldsFromAttributes());
            const column     = new Column();
            column.setField(fieldType.field);

            if (_fieldType) {
                column.setTitle(_fieldType.type.getTitle());
            }

            this.setColumn(column);
        });
    }

    /**
     * Build columns from user strategy
     */
    buildColumnsFromStrategy(): void {
        this.getColumnsStrategy().forEach((column: Column) =>
            this.setColumn(column)
        );
    }

    /**
     * Set columns.
     * Protected method
     */
    setColumns(): void {
        if (this.getColumnsStrategy().length) {
            return this.buildColumnsFromStrategy();
        }
        return this.buildColumns();
    }

    /**
     * Set tabs.
     * Protected method
     */
    setTabs(): void {
        const tabs = this.getTabsStrategy();
        if (tabs.length) {
            tabs.forEach((tab: Tab) => this.setTab(tab));
        }
    }

    /**
     * Set references.
     * Protected method
     */
    setReferences(): void {
        const references = this.getReferencesStrategy();
        if (references) {
            references.forEach((reference: string) =>
                this.setReference(reference)
            );
        }
    }

}

export default ModelAbstract;
