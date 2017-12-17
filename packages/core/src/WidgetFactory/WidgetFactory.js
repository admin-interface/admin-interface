/**
 * @module src/Shared/WidgetFactory/WidgetFactory
 * @flow
 */
import Registry from '../Registry/Registry';
import WidgetAbstract from '../WidgetAbstract/WidgetAbstract';

/**
 * Create instance of class WidgetAbstract
 * @param {string} widgetKey
 * @return {WidgetAbstract}
 */
export function WidgetFactory(widgetKey: string): WidgetAbstract {
    const widget = Registry.getRepository('Widget').get(widgetKey);
    if (!widget) {
        throw new Error(`Widget not found by key ${ widgetKey }`);
    }
    return new widget().setKey(widgetKey);
}

export default WidgetFactory;
