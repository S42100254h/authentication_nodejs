const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const models = require("../models");
const { validationResult } = require("express-validator");

const resetPasswordController = {
  async sendMail(req, res) {
    const { email } = req.body;
    const mail = process.env.MAIL_ACCOUNT;
    const pass = process.env.MAIL_PASSWORD;

    // トークン作成
    const radomStr = Math.random().toFixed(36).substring(2, 38);
    const token = crypto
      .createHmac("sha256", process.env.APP_KEY)
      .update(radomStr)
      .digest("hex");
    const passwordResetUrl =
      process.env.APP_URL +
      "/resetPassword/" +
      token +
      "?email=" +
      encodeURIComponent(email);

    models.ResetToken.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        email: email,
        token: token,
        createdAt: new Date(),
      },
    }).then(([resetToken, created]) => {
      if (!created) {
        resetToken.token = token;
        resetToken.createdAt = new Date();
        resetToken.save();
      }
    });

    // メール送信
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: mail,
        pass: pass,
      },
    });

    const message = {
      from: mail,
      to: email,
      subject: "パスワードを再設定してください",
      text:
        "以下のリンクをクリックして、パスワードを再設定してください\n\n" +
        passwordResetUrl,
    };

    transporter.sendMail(message);
    console.log("メールを送信しました");
    res.redirect("/sentMail");
  },

  async resetPassword(req, res) {
    // バリデーション
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password, token } = req.body;

    models.ResetToken.findOne({
      where: {
        email: email,
      },
      include: [{ model: models.User }],
    }).then((resetToken) => {
      console.log(token);
      if (resetToken && resetToken.token == token && resetToken.User) {
        const user = resetToken.User;
        user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
        user.save();
        resetToken.destroy();

        res.redirect("/changedPassword");
      } else {
        return res.status(422).json();
      }
    });
  },
};

module.exports = resetPasswordController;
