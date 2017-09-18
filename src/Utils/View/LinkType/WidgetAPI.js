/**
 * @module src/Utils/View/LinkType/ModelView
 * @flow
 */

import Registry from '../../../Services/Registry/ProxyInterface';
import { getMountPath } from '../../Mount/Mount';

/**
 * Get URL to Widget API
 * @param {string} widgetKey
 * @param {string} routeKey
 * @returns {string}
 */
export function getLinkApiWidget(widgetKey: string, routeKey: string): string {
    const routing = Registry.getWidget(widgetKey).getRouting();
    if (routing) {
        return `${ getMountPath() + Registry.getConfig('apiPath') + Registry.getConfig('widgetPath') }/${ widgetKey + routing[ routeKey ].route }`;
    }
    return '';
}
