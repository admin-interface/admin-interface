// @flow
import path from 'path';
import FieldTypeAbstract from '../../../Shared/FieldTypeAbstract/FieldTypeAbstract';

/**
 * Textarea FieldType
 * @extends FieldTypeAbstract
 */
class Textarea extends FieldTypeAbstract {
    /**
     * @private
     */
    _options: { [string]: any } = {
        rows: 4
    };

    static getThisPath(): string {
        return path.join(__dirname);
    }
}

export default Textarea;
