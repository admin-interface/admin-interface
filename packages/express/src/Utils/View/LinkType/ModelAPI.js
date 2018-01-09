/**
 * @module src/Utils/View/LinkType/ModelAPI
 * @flow
 */
import { Registry } from '@admin-interface/core';

import { getMountPath } from '../../Mount/Mount';

/**
 * Get URL to data of items from model
 * @param {string} modelKey - Model key
 * @param {string} refModelKey - Reference Model key
 * @param {string} refModelValue - Reference Model value
 * @returns {string}
 */
export function getLinkApiModelList(modelKey: string, refModelKey?: string, refModelValue?: string): string {
    let url = `${ getMountPath() + Registry.getRepository('Config').get('apiPath') + Registry.getRepository('Config').get('modelPath') }/${ modelKey }/list`;
    if (refModelKey && refModelValue) {
        url += `?refModel=${ refModelKey }&refModelKey=${ refModelValue }`;
    }
    return url;
}

/**
 * Get URL to delete item from model
 * @param {string} modelKey - Model key
 * @param {string} single - Item id of model
 * @returns {string}
 */
export function getLinkApiModelDelete(modelKey: string, single: string): string {
    return `${ getMountPath() + Registry.getRepository('Config').get('apiPath') + Registry.getRepository('Config').get('modelPath') }/${ modelKey }/single/${ single }/delete`;
}

/**
 * Get URL to create item of model
 * @param {string} modelKey - Model key
 * @returns {string}
 */
export function getLinkApiModelCreate(modelKey: string): string {
    return `${ getMountPath() + Registry.getRepository('Config').get('apiPath') + Registry.getRepository('Config').get('modelPath') }/${ modelKey }/create`;
}

/**
 * Get URL to update item of model
 * @param {string} modelKey - Model key
 * @param {string} single - Item id of model
 * @returns {string}
 */
export function getLinkApiModelSingleUpdate(modelKey: string, single: string): string {
    return `${ getMountPath() + Registry.getRepository('Config').get('apiPath') + Registry.getRepository('Config').get('modelPath') }/${ modelKey }/single/${ single }/update`;
}
