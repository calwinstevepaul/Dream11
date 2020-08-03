'use strict';
module.exports = (sequelize, DataTypes) => {
  const bet = sequelize.define('bet', {
    userId: DataTypes.INTEGER,
    playerId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    matchId: DataTypes.INTEGER
  }, {});
  bet.associate = function(models) {
    // associations can be defined here
    bet.belongsTo(models.player)
  };
  return bet;
};