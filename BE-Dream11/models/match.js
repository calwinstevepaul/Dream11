'use strict';
module.exports = (sequelize, DataTypes) => {
  const match = sequelize.define('match', {
    matchDateTime: DataTypes.STRING,
    homeTeamId: DataTypes.INTEGER,
    awayTeamId: DataTypes.INTEGER,
    isOver: DataTypes.BOOLEAN

  }, {});
  match.associate = function(models) {
    // associations can be defined here
    match.belongsTo(models.team,{as:"homeTeam"});
    match.belongsTo(models.team,{as:"awayTeam"});

  };
  return match;
};