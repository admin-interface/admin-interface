/**
 * @module src/Utils/View/LinkType/MenuView
 * @flow
 */
import { getLinkModelList } from './ModelView';
import { getLinkPage } from './PageView';

import type { ContextType } from '../../../Services/Registry/Type/MenuType';

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
