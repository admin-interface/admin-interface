// @flow

/**
 * @interface IFieldType
 */
export interface IFieldType {
    _key: string,
    _modelKey: string,
    _field: string,
    _title: string,
    _disabled: boolean,
    _sequelizeField: any,
    _options: { [string]: any },

    setKey(key: string): IFieldType,

    getKey(): string,

    setModelKey(modelKey: string): IFieldType,

    getModelKey(): string,

    setTitle(title: string): IFieldType,

    getTitle(): string,

    setField(field: string): IFieldType,

    getField(): string,

    setDisable(disable: boolean): IFieldType,

    getDisable(): boolean,

    isDisabled(): boolean,

    setOptions(options: {}): IFieldType,

    getOptions(): {},

    setSequelizeField(sequelizeField: any): IFieldType,

    getSequelizeField(): any,

    context(add: {}): {},

    render(itemObject: {}): string
}
