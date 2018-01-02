/* eslint-disable class-methods-use-this */
const { ModelAbstract, Column, FieldFactory } = require('@admin-interface/express');

const { Comment } = require('../../models');

class CommentAI extends ModelAbstract {
    getModel() {
        return Comment;
    }

    getColumnsStrategy() {
        return [
            new Column().setTitle('Id').setField('id'),
            new Column().setTitle('Comment').setField('content'),
            new Column().setTitle('Post name').setReferenceAndKey('title', 'Post')
        ];
    }

    getFieldsStrategy() {
        return [
            new FieldFactory('content', 'Textarea').setTitle('Comment'),
            new FieldFactory('PostId', 'Reference').setTitle('Post').setOptions({
                label: 'title'
            }),
            new FieldFactory('CreatedAt', 'Date').setTitle('Created at'),
            new FieldFactory('UpdatedAt', 'Date').setTitle('Updated at')
        ];
    }

}

module.exports = CommentAI;
