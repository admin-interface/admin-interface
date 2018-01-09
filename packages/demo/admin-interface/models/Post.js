/* eslint-disable class-methods-use-this */
const { ModelAbstract, Column, FieldFactory, Tab } = require('@admin-interface/core');

const { Post } = require('../../models');

class PostIA extends ModelAbstract {
    getModel() {
        return Post;
    }

    getColumnsStrategy() {
        return [
            new Column().setTitle('Id').setField('id'),
            new Column().setTitle('Title').setField('title'),
            new Column().setTitle('Author').setReferenceAndKey('login', 'User'),
            new Column().setTitle('Category').setReferenceAndKey('title', 'Category'),
            new Column().setTitle('Status').setField('status')
        ];
    }

    getFieldsStrategy() {
        return [
            new FieldFactory('title', 'String').setTitle('Title'),
            new FieldFactory('content', 'Tinymce').setTitle('Content').setOptions({
                height: 300
            }),
            new FieldFactory('short_content', 'Tinymce').setTitle('Short content'),
            new FieldFactory('status', 'Select').setTitle('Status').setOptions({
                options: [ 'Publish', 'Pending', 'Draft' ]
            }).setDefaultValue('Draft'),
            new FieldFactory('UserId', 'Reference').setTitle('Author').setOptions({
                label: 'login'
            }),
            new FieldFactory('CategoryId', 'Reference').setTitle('Category').setOptions({
                label: 'title'
            }),
            new FieldFactory('seo_title', 'String').setTitle('Title'),
            new FieldFactory('seo_description', 'Textarea').setTitle('Description'),
            new FieldFactory('seo_tags', 'String').setTitle('Tags')
        ];
    }

    getTabsStrategy() {
        return [
            new Tab().setTitle('Content').setIcon('reorder').setActive().setFields([
                'title',
                'content',
                'short_content'
            ]),
            new Tab().setTitle('Options').setIcon('settings').setFields([
                'UserId',
                'CategoryId',
                'status'
            ]),
            new Tab().setTitle('SEO').setIcon('search').setFields([
                'seo_title',
                'seo_description',
                'seo_tags'
            ])
        ];
    }

    getReferencesStrategy() {
        return [ 'Comment' ];
    }
}

module.exports = PostIA;
