// @flow
import lodash from 'lodash';

// import FieldType from '../../../Shared/FieldType/FieldType';
import FieldTypeAbstract from '../../../Shared/FieldTypeAbstract/FieldTypeAbstract';

let instance = null;
export default class FieldTypeRegistry {
    _fieldTypes: { [string]: typeof FieldTypeAbstract } = {};

    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    get(key: string): typeof FieldTypeAbstract {
        const fieldType = lodash.get(this._fieldTypes, key);
        if (fieldType) {
            return fieldType;
        }
        throw new Error(`Field type ${ key } not found`);
    }

    getAll(): { [string]: typeof FieldTypeAbstract } {
        return this._fieldTypes;
    }

    set(key: string, value: typeof FieldTypeAbstract): void {
        lodash.set(this._fieldTypes, key, value);
    }
}
