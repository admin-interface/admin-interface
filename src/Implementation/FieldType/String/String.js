// @flow
import path from 'path';
import FieldTypeAbstract from '../../../Shared/FieldTypeAbstract/FieldTypeAbstract';

/**
 * String FieldType
 * @extends FieldTypeAbstract
 */
class String extends FieldTypeAbstract {
    static getThisPath(): string {
        return path.join(__dirname);
    }
}

export default String;
