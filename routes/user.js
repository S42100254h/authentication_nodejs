const express = require("express");
const models = require("../models");
const bcrypt = require("bcrypt");
const session = require("express-session");

const router = express.Router();

router.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/registerSuccess", (req, res) => {
  res.render("registerSuccess");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/loginSuccess", (req, res) => {
  res.render("loginSuccess");
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await models.user.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.redirect("registerSuccess");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await models.user.findOne({
      where: { email: email },
    });

    if (bcrypt.compareSync(password, user.password)) {
      req.session.regenerate(() => {
        req.session.userId = user.id;
        console.log("ログインしました！");
      });
      res.redirect("loginSuccess");
    } else {
      console.log("パスワードに誤りがあります");
      res.redirect("login");
    }
  } catch (error) {
    console.log("入力内容に誤りがあります");
    res.redirect("login");
  }
});

module.exports = router;
