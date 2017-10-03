/**
 * @module src/Utils/Config/Config
 * @flow
 */
import path from 'path';
import { yamlConfigParse } from '../Yaml/Parser';

/**
 * Get local configuration
 * @returns {{any}}
 */
export function getLocalConfig(): { [string]: any } {
    const root = path.join(__dirname, '../../../config');
    return yamlConfigParse(root, 'admin-interface.yaml');
}
