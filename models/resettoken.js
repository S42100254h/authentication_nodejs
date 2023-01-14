"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ResetToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ResetToken.hasOne(models.User, {
        foreignKey: "email",
        sourceKey: "email",
      });
    }
  }
  ResetToken.init(
    {
      email: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ResetToken",
      updatedAt: false,
    }
  );
  return ResetToken;
};
