'use strict';
module.exports = (sequelize, DataTypes) => {
  const team = sequelize.define('team', {
    logo: DataTypes.STRING,
    teamName: DataTypes.STRING
  }, {});
  team.associate = function(models) {
    // associations can be defined here
    team.hasMany(models.player)
    
  };
  return team;
};