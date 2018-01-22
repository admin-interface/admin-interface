// @flow
import path from 'path';
import jade from 'jade';
import { FieldTypeAbstract, Registry } from '@admin-interface/core';

/**
 * Reference FieldType
 * @extends FieldTypeAbstract
 */
class Reference extends FieldTypeAbstract {
    static getThisPath(): string {
        return path.join(__dirname);
    }

    /**
     * Get context
     * @returns {{}}
     */
    context(): {} {
        const reference = this.getSequelizeField().references;

        return {
            $field: this,
            reference,
            ...Registry.getRepository('Config').get('locals')
        };
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

export default Reference;
