// @flow
import { Injectable } from 'container-ioc';
import lodash from 'lodash';
import { Registry } from '../../Registry/Registry';
import Model from '../../ModelAbstract/ModelAbstract';
import type { IModelManager } from './IModelManager';
import type { DataTableByReference } from '../../Type/DataTable';

@Injectable()
export default class ModelManager implements IModelManager {
    model: Model;
    reference: DataTableByReference;

    setModel(model: Model): ModelManager {
        this.model = model;
        return this;
    }

    async create(attributes: { [key: string]: string }) {
        const modelAttributes = lodash
            .pickBy(attributes, (value: string, key: string) => key !== this.model.getPrimaryKey());

        return await this.model.getModel().create(modelAttributes);
    }

    async delete(id: string): Promise<boolean | Error> {
        const primaryKey = this.model.getPrimaryKey();
        if (primaryKey) {
            return await this.model.getModel().destroy({
                where: { [ primaryKey ]: id }
            });
        }
        throw new Error(`Primary Key not found by model key: ${ this.model.getKey() }`);
    }

    async update(id: string, attributes: { [key: string]: string }) {
        const primaryKey = this.model.getPrimaryKey();
        if (primaryKey) {
            // Filter body
            const fields = {};
            Object.keys(attributes).forEach((key: string) => {
                if (this.model.getFieldByKey(key)) {
                    fields[ key ] = attributes[ key ];
                }
            });

            return await this.model.getModel().update(
                fields,
                { where: { [ primaryKey ]: id } }
            );
        }
        throw new Error(`Primary Key not found by model key: ${ this.model.getKey() }`);
    }

    setReference(modelId: string, modelProperty: string): ModelManager {
        const model: Model = Registry.getRepository('Model').get(modelId);
        if (model) {
            this.reference = {
                table: model.getModel().getTableName(),
                property: modelProperty
            };
        }
        return this;
    }

    getReference(): DataTableByReference {
        return this.reference;
    }
}
