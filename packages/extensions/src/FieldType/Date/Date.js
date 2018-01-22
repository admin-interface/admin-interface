// @flow
import path from 'path';
import jade from 'jade';
import moment from 'moment';
import { FieldTypeAbstract } from '@admin-interface/core';

/**
 * Date FieldType
 * @extends FieldTypeAbstract
 */
class Date extends FieldTypeAbstract {
    _options: { [string]: any } = {
        format: 'YYYY-MM-DD hh:mm:ss',
        time:   true,
        date:   true
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
        const value = itemObject ? moment(this.getValueFromObject(itemObject)).format(this.getOptions().format) : '';

        const context = {
            value,
            ...this.context()
        };
        return jade.renderFile(this.constructor.getThisPathView(), context);
    }
}

export default Date;
