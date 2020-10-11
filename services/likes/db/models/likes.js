'use strict';
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define('Likes', {
    uid: DataTypes.INTEGER,
    pid: DataTypes.INTEGER
  }, {});
  Likes.associate = function(models) {
    // associations can be defined here
  };
  return Likes;
};