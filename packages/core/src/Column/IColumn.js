// @flow

/**
 * @interface IColumn
 */
export interface IColumn {
    _title: string,
    _sorting: boolean,
    _modelField: string,
    _modelReference: string,
    _modelReferenceKey: string,
    _value: any,

    setTitle(title: string): IColumn,
    getTitle(): string,
    setSorting(sorting: boolean): IColumn,
    getSorting(): boolean,
    setField(field: string): IColumn,
    getField(): string,
    setReference(reference: string): IColumn,
    getReference(): string,
    setReferenceAndKey(key: string, reference: string): IColumn,
    setValue(value: any): IColumn,
    getValue(item: any): any,
    isEmptyValue(): boolean
}
