// @flow

/**
 * @interface TabInterface
 */
export interface TabInterface<T> {
    _fields: Array<string>,
    _title: string,
    _icon: string,
    _active: boolean,

    setTitle(title: string): T,

    getTitle(): string,

    setIcon(icon: string): T,

    getIcon(): string,

    setFields(fields: Array<string>): T,

    getFields(): Array<string>,

    getId(): string,

    setActive(active: boolean): T,

    getActive(): boolean
}
