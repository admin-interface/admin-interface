// @flow
import path from 'path';
import jade from 'jade';
import fs from 'fs';

import Registry from '../../Services/Registry/ProxyInterface';
import { WidgetAbstractInterface } from './Interface/WidgetAbstractInterface';
import { yamlConfigRoutingParser } from '../../Utils/Yaml/Parser';

import type { RoutingType } from './Type/RoutingType';

/**
 * Widget Abstract
 * @implements WidgetAbstractInterface
 */
class WidgetAbstract implements WidgetAbstractInterface<WidgetAbstract> {
    /**
     * Widget key
     * @type {string}
     * @private
     */
    _key: string;

    /**
     * Widget title
     * @type {string}
     * @private
     */
    _title: string;

    /**
     * Widget options
     * @type {{}}
     * @private
     */
    _options: {} = {};

    /**
     * Routing cache object
     * @return {RoutingType}
     */
    static _routingCache: RoutingType;

    /**
     * Get path of this widget
     * @return {string}
     */
    static getThisPath(): string {
        throw new Error('');
    }

    /**
     * Get path to a file view
     * @return {string}
     */
    static getThisPathView(): string {
        return path.join(this.getThisPath(), 'view.jade');
    }


    /**
     * Get routing this widget from a file routing.yaml
     * @return {RoutingType|null}
     */
    static getRouting(): RoutingType | null {
        const routingPath = `${ this.getThisPath() }/routing.yaml`;
        if (this._routingCache) {
            return this._routingCache;
        }

        if (fs.existsSync(routingPath)) {
            const routing      = yamlConfigRoutingParser(
                this.getThisPath(),
                'routing.yaml'
            );
            // Save routing
            this._routingCache = routing;
            return routing;
        }
        return null;
    }

    /**
     * Get key
     * @param  {string} key
     * @returns {WidgetAbstract}
     */
    setKey(key: string): WidgetAbstract {
        if (typeof key === 'string') {
            this._key = key;
        }
        return this;
    }

    /**
     * Get key
     * @return {string}
     */
    getKey(): string {
        return this._key;
    }

    /**
     * Set title
     * @param {string} title
     * @return {WidgetAbstract}
     */
    setTitle(title: string): WidgetAbstract {
        if (typeof title === 'string') {
            this._title = title;
        }
        return this;
    }

    /**
     * Get title
     * @return {string}
     */
    getTitle(): string {
        return this._title;
    }

    /**
     * Set options
     * @param {Object} options
     * @return {WidgetAbstract}
     */
    setOptions(options: {} = {}): WidgetAbstract {
        if (typeof options === 'object') {
            this._options = options;
        }
        return this;
    }

    /**
     * Get options
     * @return {Object}
     */
    getOptions(): { [string]: any } {
        return this._options;
    }

    /**
     * Get option by key
     * @param {string} key - key of option
     * @return {*}
     */
    getOption(key: string): any {
        if (typeof key === 'string') {
            return this.getOptions()[ key ];
        }
        return null;
    }

    /**
     * Render widget
     * @return {string}
     */
    render(): string {
        const context = {
            $widget: this,
            ...Registry.getConfig('locals')
        };

        return jade.renderFile(this.constructor.getThisPathView(), context);
    }
}

export default WidgetAbstract;
