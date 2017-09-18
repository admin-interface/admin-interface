// @flow
import path from 'path';
import FieldTypeAbstract from '../../../Shared/FieldTypeAbstract/FieldTypeAbstract';

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
}

export default Select;
