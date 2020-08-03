'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('matches', 'isOver', {
        type: Sequelize.BOOLEAN,
        defaultValue: false

      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('matches', 'isOver', {
        type: Sequelize.BOOLEAN
      })
    ])
  }
};
