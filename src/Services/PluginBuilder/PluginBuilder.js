// import { Express } from 'express';
//
// import { PluginBuilderInterface } from './Interface/PluginBuilderInterface';
// import { PluginInterface } from '../../Shared/Plugin/Interface/PluginInterface';
//
//
// export default class PluginBuilder implements PluginBuilderInterface {
//     _plugins: Array<PluginInterface> = [];
//
//     getPlugins(): Array<PluginInterface> {
//         return this._plugins;
//     }
//
//     setPlugin(plugin: PluginInterface): void {
//         this._plugins.push(plugin);
//     }
//
//     setPlugins(plugins: Array<PluginInterface>): void {
//         plugins.forEach(plugin => this.setPlugin(plugin));
//     }
//
//     initPlugins(app: Express): void {
//         this.getPlugins().forEach(plugin => {
//             plugin.setApp(app);
//             plugin.running();
//         });
//     }
// }
