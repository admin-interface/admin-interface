/**
 * @module src/Utils/View/LinkType/ModelView
 * @flow
 */
import { Registry } from 'admin-interface-core';

import { getMountPath } from '../../Mount/Mount';

/**
 * Get url to list model
 * @param {string} modelKey - Model key
 * @returns {string}
 */
export function getLinkModelList(modelKey: string): string {
    return `${ getMountPath() + Registry.getRepository('Config').get('modelPath') }/${ modelKey }/list`;
}

/**
 * Get url to single model item
 * @param {string} modelKey - Model key
 * @param {string} single - Item id of model
 * @returns {string}
 */
export function getLinkModelSingle(modelKey: string, single: string): string {
    return `${ getMountPath() + Registry.getRepository('Config').get('modelPath') }/${ modelKey }/single/${ single }/view`;
}
