// @flow

/**
 * @interface IWidget
 */
export interface IWidget {
    _key: string,
    _title: string,
    _options: {},

    setTitle(title: string): IWidget,

    getTitle(): string,

    setOptions(options: {}): IWidget,

    getOption(key: string): any,

    render(): string
}
