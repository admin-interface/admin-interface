// @flow
import path from 'path';
import FieldTypeAbstract from '../../../Shared/FieldTypeAbstract/FieldTypeAbstract';

/**
 * Integer FieldType
 * @extends FieldTypeAbstract
 */
class Integer extends FieldTypeAbstract {
    static getThisPath(): string {
        return path.join(__dirname);
    }
}

export default Integer;
