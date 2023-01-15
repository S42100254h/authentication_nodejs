const { check } = require("express-validator");
const models = require("../models");

module.exports = [
  check("email")
    .isEmail()
    .withMessage("有効なメールアドレス形式で指定してください"),

  check("email").custom((value) => {
    return models.User.count({
      where: {
        email: value,
      },
    }).then((userCount) => {
      if (userCount > 0) {
        throw new Error("このメールアドレスは、すでに登録されています");
      }
    });
  }),

  check("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは、8文字以上で指定してください"),

  check("passowrd").custom((value, { req }) => {
    if (req.body.password !== req.body.passwordConfirm) {
      throw new Error("パスワード（確認）と一致しません");
    }
    return true;
  }),
];
