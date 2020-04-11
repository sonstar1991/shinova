const bcrypt = require('bcryptjs');


"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING
      // role: DataTypes.INTEGER
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  
  
  return User;
};



