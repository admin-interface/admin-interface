// @flow
import path from 'path';
import jade from 'jade';
import { FieldTypeAbstract } from '@admin-interface/core';

/**
 * Tinymce FieldType
 * @extends FieldTypeAbstract
 */
class Tinymce extends FieldTypeAbstract {
    static getThisPath(): string {
        return path.join(__dirname);
    }

    /**
     * Format options to attributes
     * @returns {{}}
     */
    formatAttributes(): { [string]: any } {
        const attributes = {};
        Object.keys(this.getOptions()).forEach((key: string) => {
            attributes[ `data-tinymce-${ key }` ] = this.getOptions()[ key ];
        });
        return attributes;
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

export default Tinymce;
