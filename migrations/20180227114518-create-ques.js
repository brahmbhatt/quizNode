'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ques', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      qid: {
        type: Sequelize.STRING
      },
      que: {
        type: Sequelize.STRING
      },
      op1: {
        type: Sequelize.STRING
      },
      op2: {
        type: Sequelize.STRING
      },
      op3: {
        type: Sequelize.STRING
      },
      op4: {
        type: Sequelize.STRING
      },
      ans: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ques');
  }
};