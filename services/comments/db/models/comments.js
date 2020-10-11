'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    text: DataTypes.STRING,
    uid: DataTypes.INTEGER,
    pid: DataTypes.INTEGER,
    date: DataTypes.STRING
  }, {});
  Comments.associate = function(models) {
    // associations can be defined here
  };
  return Comments;
};