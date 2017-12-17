// @flow

/**
 * @interface ColumnInterface
 */
export interface ColumnInterface<T> {
    _title: string,
    _sorting: boolean,
    _modelField: string,
    _modelReference: string,
    _modelReferenceKey: string,
    _value: any,

    setTitle(title: string): T,
    getTitle(): string,
    setSorting(sorting: boolean): T,
    getSorting(): boolean,
    setField(field: string): T,
    getField(): string,
    setReference(reference: string): T,
    getReference(): string,
    setReferenceAndKey(key: string, reference: string): T,
    setValue(value: any): T,
    getValue(item: any): any,
    isEmptyValue(): boolean
}
