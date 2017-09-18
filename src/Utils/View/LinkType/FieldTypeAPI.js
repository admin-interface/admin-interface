/**
 * @module src/Utils/View/LinkType/ModelView
 * @flow
 */

import Registry from '../../../Services/Registry/ProxyInterface';
import { getMountPath } from '../../Mount/Mount';

/**
 * Get URL to FieldType API
 * @param {string} fieldKey
 * @param {string} routeKey
 * @returns {string}
 */
export function getLinkApiFieldType(fieldKey: string, routeKey: string): string {
    const routing = Registry.getFieldType(fieldKey).getRouting();
    if (routing) {
        return `${ getMountPath() + Registry.getConfig('apiPath') + Registry.getConfig('fieldPath') }/${ fieldKey + routing[ routeKey ].route }`;
    }
    return '';
}
