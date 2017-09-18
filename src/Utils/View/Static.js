/**
 * @module src/Utils/Sequelize/Query
 * @flow
 */
import Registry from '../../Services/Registry/ProxyInterface';
import { getMountPath } from '../Mount/Mount';

/**
 * Get static file url
 * @param {string} filePath
 * @returns {string}
 */
export function getStaticFile(filePath: string = ''): string {
    return getMountPath() + Registry.getConfig('staticPath') + filePath;
}
