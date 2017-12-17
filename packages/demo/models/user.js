'use strict';

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		login: DataTypes.STRING,
		email: DataTypes.STRING,
		role: DataTypes.STRING
	});

	User.associate = function(models) {
		User.hasMany(models.Post);
	};

	return User;
};
