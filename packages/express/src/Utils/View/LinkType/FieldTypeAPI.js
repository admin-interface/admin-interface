/**
 * @module src/Utils/View/LinkType/ModelView
 * @flow
 */
import { Registry } from '@admin-interface/core';

import { getMountPath } from '../../Mount/Mount';

/**
 * Get URL to FieldType API
 * @param {string} fieldKey
 * @param {string} routeKey
 * @returns {string}
 */
export function getLinkApiFieldType(fieldKey: string, routeKey: string): string {
    const routing = Registry.getRepository('FieldType').get(fieldKey).getRouting();
    if (routing) {
        return `${ getMountPath() + Registry.getRepository('Config').get('apiPath') + Registry.getRepository('Config').get('fieldPath') }/${ fieldKey + routing[ routeKey ].route }`;
    }
    return '';
}
