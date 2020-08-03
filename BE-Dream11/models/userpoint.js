'use strict';
module.exports = (sequelize, DataTypes) => {
  const userPoint = sequelize.define('userPoint', {
    userId: DataTypes.INTEGER,
    matchId: DataTypes.INTEGER,
    points: DataTypes.INTEGER
  }, {});
  userPoint.associate = function(models) {
    // associations can be defined here
    userPoint.belongsTo(models.user)
    userPoint.belongsTo(models.match)

  };
  return userPoint;
};