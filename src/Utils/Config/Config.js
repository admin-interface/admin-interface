/**
 * @module src/Utils/Config/Config
 * @flow
 */
import RootPath from 'app-root-path';

import { yamlConfigParse } from '../Yaml/Parser';

/**
 * Get local configuration
 * @returns {{any}}
 */
export function getLocalConfig(): {[string]: any} {
    return yamlConfigParse(RootPath.path, 'admin-interface.yaml');
}
