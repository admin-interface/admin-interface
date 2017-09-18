// @flow
// import Express from 'express';

import '../../Event/Installation';
import EventEmitter from '../../Services/EventEmitter/EventEmitter';
import Registry from '../../Services/Registry/ProxyInterface';
// import PluginBuilder from '../../Services/PluginBuilder/PluginBuilder';
import { yamlConfigParse } from '../../Utils/Yaml/Parser';

/**
 * Admin Interface class
 */
class AdminInterface {
    // _pluginBuilder: PluginBuilder = new PluginBuilder();

    setConfigFile(dirname: string, configFile: string): AdminInterface { // aeslint-disable-line class-methods-use-this
        const config = yamlConfigParse(dirname, configFile);
        EventEmitter.emit('set-config', config);
        return this;
    }

    start(): void {
        EventEmitter.emit('start:after');

        EventEmitter.emit('start:init-plugin', this);
        // const pluginBuilder = new PluginBuilder();
        // pluginBuilder.initPlugins(Registry.getApp());

        EventEmitter.emit('start');

        EventEmitter.emit('start:before');
    }

    middleware(): express$Application {
        // run project
        this.start();

        // get local express app
        return Registry.getApp();
    }

    // getPluginBuilder(): PluginBuilder {
    //     return this._pluginBuilder;
    // }
}

export default AdminInterface;
