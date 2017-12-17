/**
 * @module src/Utils/Config/Config
 * @flow
 */
import path from 'path';
import { Utils } from '@admin-interface/core';

/**
 * Get local configuration
 * @returns {{any}}
 */
export function getLocalConfig(): { [string]: any } {
    const root = path.join(__dirname, '../../../config');
    return Utils.yamlConfigParse(root, 'admin-interface.yaml');
}
