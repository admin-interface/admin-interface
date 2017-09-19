// @flow
import path from 'path';
import FieldTypeAbstract from '../../../Shared/FieldTypeAbstract/FieldTypeAbstract';

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
}

export default Tinymce;
