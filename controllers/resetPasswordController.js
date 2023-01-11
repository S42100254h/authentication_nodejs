const nodemailer = require("nodemailer");

const resetPasswordController = {
  async sendMail(req, res) {
    const { email } = req.body;

    const mail = process.env.MAIL_ACCOUNT;
    const pass = process.env.MAIL_PASSWORD;

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
      text: "以下のリンクをクリックして、パスワードを再設定してください",
    };

    transporter.sendMail(message);
    console.log("メールを送信しました");
    return res.json(200);
  },
};

module.exports = resetPasswordController;
