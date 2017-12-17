/**
 * @module src/Utils/Sequelize/Query
 * @flow
 */
import { Registry } from '@admin-interface/core';

import { getMountPath } from '../Mount/Mount';

/**
 * Get static file url
 * @param {string} filePath
 * @returns {string}
 */
export function getStaticFile(filePath: string = ''): string {
    return getMountPath() + Registry.getRepository('Config').get('staticPath') + filePath;
}
