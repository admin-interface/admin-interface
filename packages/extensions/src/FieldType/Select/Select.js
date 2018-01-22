// @flow
import path from 'path';
import jade from 'jade';
import { FieldTypeAbstract } from '@admin-interface/core';

/**
 * Select FieldType
 * @extends FieldTypeAbstract
 */
class Select extends FieldTypeAbstract {
    /**
     * @type {{options: Array}}
     * @private
     */
    _options: { [string]: any } = {
        options: []
    };

    static getThisPath(): string {
        return path.join(__dirname);
    }

    /**
     * Render FieldType
     * @param {{}} itemObject
     * @returns {string}
     */
    render(itemObject?: { [string]: any }): string {
        const value   = itemObject ? this.getValueFromObject(itemObject) : this.getDefaultValue();
        const context = {
            value,
            ...this.context()
        };

        return jade.renderFile(this.constructor.getThisPathView(), context);
    }
}

export default Select;
