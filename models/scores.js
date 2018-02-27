'use strict';
module.exports = (sequelize, DataTypes) => {
  var scores = sequelize.define('scores', {
    uname: DataTypes.STRING,
    score: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return scores;
};