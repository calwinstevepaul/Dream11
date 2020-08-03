'use strict';
module.exports = (sequelize, DataTypes) => {
  const player = sequelize.define('player', {
    teamId: DataTypes.INTEGER,
    playerName: DataTypes.STRING
  }, {});
  player.associate = function(models) {
    // associations can be defined here
    player.hasMany(models.point)
  };
  return player;
};