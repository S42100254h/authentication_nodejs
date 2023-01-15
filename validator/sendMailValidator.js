const { check } = require("express-validator");
const models = require("../models");

module.exports = [
  check("email").custom((value, { req }) => {
    return models.User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (!user) {
        throw new Error(
          "このメールアドレスに一致するユーザーを見つけることが出来ませんでした"
        );
      }
    });
  }),
];
