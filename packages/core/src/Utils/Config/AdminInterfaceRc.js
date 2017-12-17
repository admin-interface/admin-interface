// @flow
import path from 'path';
import fs from 'fs';

import EventEmitter from '../../EventEmitter/EventEmitter';
import { yamlConfigParse } from '../Yaml/Parser';

/**
 * Get default options
 * @returns {*}
 */
export function getDefaultFileRc(): { [string]: any } {
    return {
        configFile: 'admin-interface.yaml'
    };
}

/**
 * Set the config file from the .admininterfacerc file
 */
export function setConfigFileFromRc(): void {
    const pathFile: string = path.join(path.dirname(require.main.filename), '.admininterfacerc');
    if (!fs.existsSync(pathFile)) {
        throw new Error('Don\'t find a file .admininterfacerc');
    }

    try {
        // Include the .admininterfacerc file
        const configrc: { [string]: any } = require(pathFile); // eslint-disable-line import/no-dynamic-require, global-require
        // File name
        const configFileName: string    = configrc.configFile || getDefaultFileRc().configFile;
        // Parse yaml config
        const config: { [string]: any } = yamlConfigParse(path.dirname(pathFile), configFileName);

        // Set config
        EventEmitter.emit('set-config', config);
    } catch (err) {
        throw err;
    }
}
