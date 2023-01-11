const models = require("../models");
const bcrypt = require("bcrypt");

const userController = {
  async register(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await models.user.create({
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
      const user = await models.user.findOne({
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
