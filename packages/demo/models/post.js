'use strict';

module.exports = function(sequelize, DataTypes) {
	const Post = sequelize.define('Post', {
        title: DataTypes.STRING,
        content: DataTypes.STRING,
		short_content: DataTypes.STRING,
		status: {
			type: DataTypes.STRING,
			defaultValue: 'Publish'
		},
		seo_title: DataTypes.STRING,
		seo_description: DataTypes.STRING,
		seo_tags: DataTypes.STRING
    });

	Post.associate = function(models) {
		Post.belongsTo(models.User);
		Post.belongsTo(models.Category);
	};

	return Post;
};
