/**
 * src/Utils/View/LinkType/PageView
 * @flow
 */

import Registry from '../../../Services/Registry/ProxyInterface';
import { getMountPath } from '../../Mount/Mount';

/**
 * Get URL to custom page
 * @param {string} key - Page key
 * @returns {string}
 */
export function getLinkPage(key: string): string {
    const page = Registry.getPage(key);
    if (page) {
        return getMountPath() + page.getUrl();
    }
    return '';
}
