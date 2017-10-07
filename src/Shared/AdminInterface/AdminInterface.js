// @flow
import '../../Event/Installation';
import EventEmitter from '../../Services/EventEmitter/EventEmitter';
import Registry from '../../Services/Registry/ProxyInterface';
import { yamlConfigParse } from '../../Utils/Yaml/Parser';
import { setConfigFileFromRc } from '../../Utils/Config/AdminInterfaceRc';

/**
 * Admin Interface class
 */
class AdminInterface {
    _useRC: boolean = true;

    setConfigFile(dirname: string, configFile: string): AdminInterface { // aeslint-disable-line class-methods-use-this
        const config = yamlConfigParse(dirname, configFile);
        EventEmitter.emit('set-config', config);

        // Do not use the .admininterfacerc file
        this.setUseRC(false);

        return this;
    }

    start(): void {
        if (this.getUseRC()) {
            // Set config file from the .admininterfacerc file
            setConfigFileFromRc();
        }

        EventEmitter.emit('start:after');

        EventEmitter.emit('start:init-plugin', this);

        EventEmitter.emit('start');

        EventEmitter.emit('start:before');
    }

    middleware(): express$Application {
        // run project
        this.start();

        // get local express app
        return Registry.getApp();
    }

    setUseRC(useRC: boolean = true): AdminInterface {
        if (typeof useRC === 'boolean') {
            this._useRC = useRC;
        }
        return this;
    }

    getUseRC(): boolean {
        return this._useRC;
    }
}

export default AdminInterface;
