// @flow

/**
 * @interface ITab
 */
export interface ITab {
    _fields: string[],
    _title: string,
    _icon: string,
    _active: boolean,

    setTitle(title: string): ITab,

    getTitle(): string,

    setIcon(icon: string): ITab,

    getIcon(): string,

    setFields(fields: string[]): ITab,

    getFields(): string[],

    getId(): string,

    setActive(active: boolean): ITab,

    getActive(): boolean
}
