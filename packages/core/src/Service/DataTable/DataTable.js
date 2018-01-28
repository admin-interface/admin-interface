// @flow
import { Injectable } from 'container-ioc';
import type { IDataTable } from './IDataTable';
import type { DataTableColumnType, DataTableOrderType } from '../../Type/DataTable';
import Column from '../../Column/Column';

@Injectable()
export default class DataTable implements IDataTable {
    columns: DataTableColumnType[] = [];
    limit: number = 10;
    offset: number = 0;
    order: DataTableOrderType;

    setColumn(column: DataTableColumnType): DataTable {
        this.columns = this.columns.concat(column);
        return this;
    }

    getColumns(): DataTableColumnType[] {
        return this.columns;
    }

    setLimit(limit: number = 10): DataTable {
        this.limit = limit;
        return this;
    }

    getLimit(): number {
        return this.limit;
    }

    setOffset(offset: number = 0): DataTable {
        this.offset = offset;
        return this;
    }

    getOffset(): number {
        return this.offset;
    }

    setOrder(column: Column, dir: string): DataTable {
        this.order = { column, dir: dir.toLocaleUpperCase() };
        return this;
    }

    getOrder(): Array<Array<string | {}>> {
        if (this.order.column.getReference()) {
            return [
                [
                    {
                        association: this.order.column.getReference(),
                        as:          this.order.column.getReference()
                    },
                    `${ this.order.column.getReference() }.${ this.order.column.getReferenceKey() }`,
                    this.order.dir
                ]
            ];
        }
        return [ [ this.order.column.getField(), this.order.dir ] ];
    }
}
