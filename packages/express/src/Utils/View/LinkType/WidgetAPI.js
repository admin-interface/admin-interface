/**
 * @module src/Utils/View/LinkType/ModelView
 * @flow
 */
import { Registry } from '@admin-interface/core';

import { getMountPath } from '../../Mount/Mount';

/**
 * Get URL to Widget API
 * @param {string} widgetKey
 * @param {string} routeKey
 * @returns {string}
 */
export function getLinkApiWidget(widgetKey: string, routeKey: string): string {
    const routing = Registry.getRepository('Widget').get(widgetKey).getRouting();
    if (routing) {
        return `${ getMountPath() + Registry.getRepository('Config').get('apiPath') + Registry.getRepository('Config').get('widgetPath') }/${ widgetKey + routing[ routeKey ].route }`;
    }
    return '';
}
