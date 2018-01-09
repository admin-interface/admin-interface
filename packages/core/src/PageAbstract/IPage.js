// @flow
import WidgetAbstract from '../WidgetAbstract/WidgetAbstract';

/**
 * @interface IPage
 */
export interface IPage {
    _key: string,

    setKey(key: string): IPage,

    getKey(): string,

    getUrl(): string,

    getWidgets(): WidgetAbstract[],

    render(void | mixed): mixed
}
