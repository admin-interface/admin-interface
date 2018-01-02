/* eslint-disable class-methods-use-this */
const { ModelAbstract, Column, FieldFactory } = require('@admin-interface/express');

const { User } = require('../../models');

class UserAI extends ModelAbstract {
    getModel() {
        return User;
    }

    getColumnsStrategy() {
        return [
            new Column().setTitle('Id').setField('id'),
            new Column().setTitle('Login').setField('login'),
            new Column().setTitle('Role').setField('role')
        ];
    }

    getFieldsStrategy() {
        return [
            new FieldFactory('login', 'String').setTitle('Login'),
            new FieldFactory('email', 'String').setTitle('Email'),
            new FieldFactory('role', 'Select').setTitle('Role').setOptions({
                options: [ 'Administration', 'Author', 'Moderator' ]
            })
        ];
    }

    getReferencesStrategy() {
        return [ 'Post' ];
    }
}

module.exports = UserAI;
