'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profiles = sequelize.define('Profiles', {
    name: DataTypes.STRING,
    descriptions: DataTypes.STRING,
    img: DataTypes.STRING,
    uid: DataTypes.INTEGER
  }, {});
  Profiles.associate = function(models) {
    // associations can be defined here
  };
  return Profiles;
};