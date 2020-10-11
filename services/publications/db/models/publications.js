'use strict';
module.exports = (sequelize, DataTypes) => {
  const Publications = sequelize.define('Publications', {
    text: DataTypes.STRING,
    uid: DataTypes.INTEGER,
    date: DataTypes.STRING,
    img: DataTypes.STRING
  }, {});
  Publications.associate = function(models) {
    // associations can be defined here
  };
  return Publications;
};