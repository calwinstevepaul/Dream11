'use strict';
module.exports = (sequelize, DataTypes) => {
  const selected = sequelize.define('selected', {
    userId: DataTypes.INTEGER,
    playerId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    matchId: DataTypes.INTEGER
  }, {});
  selected.associate = function(models) {
    // associations can be defined here
    selected.belongsTo(models.player);
    selected.belongsTo(models.team);


  };
  return selected;
};