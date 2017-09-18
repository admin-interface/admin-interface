// @flow
import FieldTypeAbstract from '../../Shared/FieldTypeAbstract/FieldTypeAbstract';
import ModelAbstract from '../../Shared/ModelAbstract/ModelAbstract';
import WidgetAbstract from '../../Shared/WidgetAbstract/WidgetAbstract';
import PageAbstract from '../../Shared/PageAbstract/PageAbstract';
import ExpressRegistry from './Registries/ExpressRegistry';
import ConfigRegistry from './Registries/ConfigRegistry';
import ModelRegistry from './Registries/ModelRegistry';
import MenuRegistry from './Registries/MenuRegistry';
import FieldTypeRegistry from './Registries/FieldTypeRegistry';
import PageRegistry from './Registries/PageRegistry';
import WidgetRegistry from './Registries/WidgetRegistry';

import type { MenuType } from './Type/MenuType';

/**
 * Proxy Interface Registry
 */
class ProxyInterface {
    /**
     * Get express application instance
     * @returns {express$Application}
     */
    static getApp(): express$Application {
        return new ExpressRegistry().get();
    }

    /**
     * Get config item
     * @param {string} key - Format (value) or (value.value)
     * @returns {any}
     */
    static getConfig(key: string): any {
        return new ConfigRegistry().get(key);
    }

    /**
     * Set config item
     * @param {string} key
     * @param {any} value
     */
    static setConfig(key: string, value: any): void {
        new ConfigRegistry().set(key, value);
    }

    /**
     * Push config item
     * @param {string} key
     * @param {any} value
     */
    static pushConfig(key: string, value: any): void {
        new ConfigRegistry().push(key, value);
    }

    /**
     * Get Model  by key
     * @param {string} key - Model key
     * @returns {ModelAbstract|void}
     */
    static getModel(key: string): ModelAbstract | void {
        return new ModelRegistry().get(key);
    }

    /**
     * Get all models
     * @returns {Array<ModelAbstract>}
     */
    static getAllModel(): Array<ModelAbstract> {
        return new ModelRegistry().getAll();
    }

    /**
     * Get model by table name
     * @param {string} tableName - Table name
     * @returns {Model|void}
     */
    static getModelByTableName(tableName: string): ModelAbstract | void {
        return new ModelRegistry().getByTableName(tableName);
    }

    /**
     * Set model
     * @param model
     */
    static setModel(model: ModelAbstract): void {
        new ModelRegistry().set(model);
    }

    /**
     * Check has model
     * @param {string} key - Model key
     * @returns {boolean}
     */
    static hasModel(key: string): boolean {
        return new ModelRegistry().hasModel(key);
    }

    /**
     * Get menu by key
     * @param {string} key - Menu key
     * @returns {MenuType}
     */
    static getMenu(key: string): MenuType {
        return new MenuRegistry().get(key);
    }

    /**
     * Get all menus
     * @returns {{string: MenuType}}
     */
    static getAllMenu(): { [string]: MenuType } {
        return new MenuRegistry().getAll();
    }

    /**
     * Set menu
     * @param {string} key
     * @param {MenuType} value
     */
    static setMenu(key: string, value: MenuType): void {
        new MenuRegistry().set(key, value);
    }

    /**
     * Get FieldType by key
     * @param {string} key - FieldType key
     * @returns {FieldTypeAbstract}
     */
    static getFieldType(key: string): typeof FieldTypeAbstract {
        return new FieldTypeRegistry().get(key);
    }

    /**
     * Get all FieldTypes
     * @returns {Array<FieldTypeAbstract>}
     */
    static getAllFieldType(): { [string]: typeof FieldTypeAbstract } {
        return new FieldTypeRegistry().getAll();
    }

    /**
     * Set FieldType
     * @param {string} key
     * @param {FieldTypeAbstract} value
     */
    static setFieldType(key: string, value: typeof FieldTypeAbstract): void {
        new FieldTypeRegistry().set(key, value);
    }

    /**
     * Set page
     * @param {PageAbstract} page
     */
    static setPage(page: PageAbstract): void {
        new PageRegistry().set(page);
    }

    /**
     * Get page by key
     * @param {string} key - Page key
     * @returns {PageAbstract|void}
     */
    static getPage(key: string): PageAbstract | void {
        return new PageRegistry().get(key);
    }

    /**
     * Get all pages
     * @returns {Array<PageAbstract>}
     */
    static getAllPage(): Array<PageAbstract> {
        return new PageRegistry().getAll();
    }

    /**
     * Set widget
     * @param {string} key
     * @param {WidgetAbstract} value
     */
    static setWidget(key: string, value: typeof WidgetAbstract): void {
        new WidgetRegistry().set(key, value);
    }

    /**
     * Get widget by key
     * @param {string} key - Widget key
     * @returns {WidgetAbstract}
     */
    static getWidget(key: string): typeof WidgetAbstract {
        return new WidgetRegistry().get(key);
    }

    /**
     * Get all widgets
     * @returns {{string: WidgetAbstract}}
     */
    static getAllWidget(): { [string]: typeof WidgetAbstract } {
        return new WidgetRegistry().getAll();
    }
}

export default ProxyInterface;
