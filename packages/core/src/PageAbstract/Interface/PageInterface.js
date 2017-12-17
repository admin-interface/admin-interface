// @flow
import WidgetAbstract from '../../WidgetAbstract/WidgetAbstract';

/**
 * @interface PageInterface
 */
export interface PageInterface<T> {
    _key: string,

    setKey(key: string): T,

    getKey(): string,

    getUrl(): string,

    getWidgets(): Array<WidgetAbstract>,

    render(): mixed
}
