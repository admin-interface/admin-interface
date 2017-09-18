// @flow
import path from 'path';
import FieldTypeAbstract from '../../../Shared/FieldTypeAbstract/FieldTypeAbstract';
import Registry from '../../../Services/Registry/ProxyInterface';

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
            ...Registry.getConfig('locals')
        };
    }
}

export default Reference;
