

module.exports = (sequelize, DataTypes) => {
  const ques = sequelize.define('ques', {
    qid: DataTypes.STRING,
    que: DataTypes.STRING,
    op1: DataTypes.STRING,
    op2: DataTypes.STRING,
    op3: DataTypes.STRING,
    op4: DataTypes.STRING,
    ans: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return ques;
};
