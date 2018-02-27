'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    uname: DataTypes.STRING,
    qid: DataTypes.STRING,
    ans: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return users;
};