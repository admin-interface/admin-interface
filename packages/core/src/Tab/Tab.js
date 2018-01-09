// @flow
import lodash from 'lodash';

import type { ITab } from './ITab';

/**
 * Tab class
 * @implements ITab
 */
class Tab implements ITab {
    /**
     * Fields
     * @type {Array<string>}
     * @private
     */
    _fields: string[] = [];
    /**
     * Active tab
     * @type {boolean}
     * @private
     */
    _active: boolean = false;
    /**
     * Title
     * @type {string}
     * @private
     */
    _title: string;
    /**
     * Icon
     * @type {string}
     * @private
     */
    _icon: string;

    /**
     * Set title
     * @param {string} title
     * @returns {Tab}
     */
    setTitle(title: string): Tab {
        if (typeof title === 'string') {
            this._title = title;
        }
        return this;
    }

    /**
     * Get title
     * @returns {string}
     */
    getTitle(): string {
        return this._title;
    }

    /**
     * Set icon
     * @param {string} icon
     * @returns {Tab}
     */
    setIcon(icon: string): Tab {
        if (typeof icon === 'string') {
            this._icon = icon;
        }
        return this;
    }

    /**
     * Get icon
     * @returns {string}
     */
    getIcon(): string {
        return this._icon;
    }

    /**
     * Get id of tab
     * @returns {string}
     */
    getId() {
        return lodash.snakeCase(this.getTitle());
    }

    /**
     * Set fields
     * @param {Array<string>} fields
     * @returns {Tab}
     */
    setFields(fields: string[]): Tab {
        if (Array.isArray(fields)) {
            this._fields = fields;
        }
        return this;
    }

    /**
     * Get fields
     * @returns {Array<string>}
     */
    getFields(): string[] {
        return this._fields;
    }

    /**
     * Set active
     * @param active
     * @returns {Tab}
     */
    setActive(active: boolean = true): Tab {
        if (typeof active === 'boolean') {
            this._active = active;
        }
        return this;
    }

    /**
     * Get active
     * @returns {boolean}
     */
    getActive(): boolean {
        return this._active;
    }
}

export default Tab;
