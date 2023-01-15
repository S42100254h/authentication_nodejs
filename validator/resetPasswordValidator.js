const { check } = require("express-validator");

module.exports = [
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
