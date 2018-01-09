// @flow
import { Model as SequelizeModel } from 'sequelize';

import FieldFactory from '../FieldFactory/FieldFactory';
import Column from '../Column/Column';
import Tab from '../Tab/Tab';

import { type FieldType } from './types';

/**
 * @interface IModel
 */
export interface IModel {
    _key: string,
    _fields: FieldType[],
    _columns: Column[],
    _tabs: Tab[],
    _references: string[],

    getModel(): SequelizeModel,

    getKey(): string,

    setKey(key: string): IModel,

    setField(field: FieldType): IModel,

    getFields(): Array<FieldType>,

    getFieldByKey(key: string): FieldType | void,

    setColumn(column: Column): IModel,

    getColumns(): Array<Column>,

    setReference(reference: string): IModel,

    getReferences(): Array<string>,

    setTab(tab: Tab): IModel,

    getTabs(): Array<Tab>,

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

    getTabsStrategy(): Array<Tab>,

    setTabs(): void,

    setReferences(): void
}
