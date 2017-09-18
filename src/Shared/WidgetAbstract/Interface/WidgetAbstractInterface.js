// @flow

/**
 * @interface WidgetAbstractInterface
 */
export interface WidgetAbstractInterface<T> {
    _key: string,
    _title: string,
    _options: {},

    setTitle(title: string): T,

    getTitle(): string,

    setOptions(options: {}): T,

    getOption(key: string): any,

    render(): string
}
