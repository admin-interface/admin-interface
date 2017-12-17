'use strict';

module.exports = function(sequelize, DataTypes) {
	const Category = sequelize.define('Category', {
        title: DataTypes.STRING
    });

	Category.associate = function(models) {
		Category.hasMany(models.Post);
	};

	return Category;
};
