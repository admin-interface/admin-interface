'use strict';

module.exports = function(sequelize, DataTypes) {
	const Comment = sequelize.define('Comment', {
        content: DataTypes.STRING
    });

	Comment.associate = function(models) {
        Comment.belongsTo(models.Post);
	};

	return Comment;
};
