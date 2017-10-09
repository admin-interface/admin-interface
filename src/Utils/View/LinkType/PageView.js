/**
 * src/Utils/View/LinkType/PageView
 * @flow
 */
import { Registry } from 'admin-interface-core';

import { getMountPath } from '../../Mount/Mount';

/**
 * Get URL to custom page
 * @param {string} key - Page key
 * @returns {string}
 */
export function getLinkPage(key: string): string {
    const page = Registry.getRepository('Page').get(key);
    if (page) {
        return getMountPath() + page.getUrl();
    }
    return '';
}
