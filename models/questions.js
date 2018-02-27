'use strict';
module.exports = (sequelize, DataTypes) => {
  var questions = sequelize.define('questions', {
    qid: DataTypes.STRING,
    que: DataTypes.STRING,
    options: DataTypes.JSON,
    ans: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return questions;
};