// @flow
import { Model as SequelizeModel } from 'sequelize';

import FieldFactory from '../../FieldFactory/FieldFactory';
import Column from '../../Column/Column';

import { type FieldType } from '../Type/FieldType';

/**
 * @interface ModelInterface
 */
export interface ModelInterface<T> {
    _key: string,
    _fields: Array<FieldType>,
    _columns: Array<Column>,
    _references: Array<string>,

    getModel(): SequelizeModel,

    getKey(): string,

    setKey(key: string): T,

    setField(field: FieldType): T,

    getFields(): Array<FieldType>,

    getFieldByKey(key: string): FieldType | void,

    setColumn(column: Column): T,

    getColumns(): Array<Column>,

    setReference(reference: string): T,

    getReferences(): Array<string>,

    isShowActions(): boolean,

    getPrimaryKey(): string | null,

    getNameSingular(): string,

    getNamePlural(): string,

    getFieldsStrategy(): Array<FieldFactory>,

    getColumnsStrategy(): Array<Column>,

    getReferencesStrategy(): Array<string>,

    setFields(): void,

    buildFields(): void,

    buildFieldsByStrategy(): void,

    setColumns(): void,

    buildColumns(): void,

    buildColumnsFromStrategy(): void,

    setReferences(): void
}
