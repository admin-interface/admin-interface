/* eslint-disable class-methods-use-this */
const { ModelAbstract, Column, FieldFactory } = require('@admin-interface/core');

const { Category } = require('../../models');

class CategoryAI extends ModelAbstract {
    getModel() {
        return Category;
    }

    getColumnsStrategy() {
        return [
            new Column().setTitle('Id').setField('id'),
            new Column().setTitle('Category name').setField('title')
        ];
    }

    getFieldsStrategy() {
        return [
            new FieldFactory('title', 'String').setTitle('Category name')
        ];
    }

    getReferencesStrategy() {
        return [ 'Post' ];
    }
}

module.exports = CategoryAI;
