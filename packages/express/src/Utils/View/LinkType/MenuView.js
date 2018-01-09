/**
 * @module src/Utils/View/LinkType/MenuView
 * @flow
 */
import type { ContextType } from '@admin-interface/core';

import { getLinkModelList } from './ModelView';
import { getLinkPage } from './PageView';


/**
 * Get url to list from context menu item
 * @param {ContextType} context
 * @returns {string}
 */
export function getLinkListByContext(context: ContextType): string {
    switch (context.type) {
        case 'Model':
            return getLinkModelList(context.key);
        case 'Page':
            return getLinkPage(context.key);
        default:
            return '';
    }
}
