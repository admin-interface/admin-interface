'use strict';

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
	const Post = sequelize.define('Post', {
        title: DataTypes.STRING,
        content: DataTypes.STRING
    });

	// Post.associate = function(models) {
	// 	// one to one
	// 	// Post.belongsTo(models.User);
	// 	// Post.hasMany(models.Comment);
	// };

	return Post;
};
