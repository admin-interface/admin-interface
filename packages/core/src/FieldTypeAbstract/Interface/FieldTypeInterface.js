// @flow

/**
 * @interface FieldTypeInterface
 */
export interface FieldTypeInterface<T> {
    _key: string,
    _modelKey: string,
    _field: string,
    _title: string,
    _disabled: boolean,
    _sequelizeField: any,
    _options: { [string]: any },

    setKey(key: string): T,

    getKey(): string,

    setModelKey(modelKey: string): T,

    getModelKey(): string,

    setTitle(title: string): T,

    getTitle(): string,

    setField(field: string): T,

    getField(): string,

    setDisable(disable: boolean): T,

    getDisable(): boolean,

    isDisabled(): boolean,

    setOptions(options: {}): T,

    getOptions(): {},

    setSequelizeField(sequelizeField: any): T,

    getSequelizeField(): any,

    context(add: {}): {},

    render(itemObject: {}): string
}
