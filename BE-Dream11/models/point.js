'use strict';
module.exports = (sequelize, DataTypes) => {
  const point = sequelize.define('point', {
    playerId: DataTypes.INTEGER,
    matchId: DataTypes.INTEGER,
    points: DataTypes.INTEGER
  }, {});
  point.associate = function(models) {
    // associations can be defined here
  };
  return point;
};