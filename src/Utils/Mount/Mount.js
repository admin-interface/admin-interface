/**
 * @module src/Utils/Mount/Mount
 * @flow
 */
import Registry from '../../Services/Registry/ProxyInterface';

/**
 * Get mount path
 * @returns {string}
 */
export function getMountPath(): string {
    return Registry.getApp().mountpath;
}
