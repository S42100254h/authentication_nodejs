const models = require("../models");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const userController = {
  async register(req, res) {
    // バリデーション
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));

    try {
      await models.User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      res.redirect("/registerSuccess");
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await models.User.findOne({
        where: { email: email },
      });

      if (bcrypt.compareSync(password, user.password)) {
        req.session.userId = user.id;
        console.log("ログインしました！");
        if (req.session.url) {
          res.redirect(req.session.url);
        } else {
          res.redirect("/loginSuccess");
        }
      } else {
        console.log("パスワードに誤りがあります");
        res.redirect("/login");
      }
    } catch (error) {
      console.log("入力内容に誤りがあります");
      res.redirect("/login");
    }
  },

  async logout(req, res) {
    console.log("ログアウトしました！");
    req.session.destroy();
    res.redirect("/login");
  },
};

module.exports = userController;
