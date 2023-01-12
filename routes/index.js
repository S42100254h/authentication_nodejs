const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");

router.get("/register", (req, res) => {
  res.render("register", { csrfToken: req.csrfToken() });
});

router.get("/registerSuccess", (req, res) => {
  res.render("registerSuccess");
});

router.get("/login", (req, res) => {
  res.render("login", { csrfToken: req.csrfToken() });
});

router.get("/loginSuccess", (req, res) => {
  res.render("loginSuccess");
});

router.get("/mypage", authUser, (req, res) => {
  res.render("mypage");
});

router.get("/mypage2", authUser, (req, res) => {
  res.render("mypage2");
});

router.get("/forgetPassword", (req, res) => {
  res.render("forgetPassword", { csrfToken: req.csrfToken() });
});

router.get("/sentMail", (req, res) => {
  res.render("sentMail");
});

router.get("/resetPassword", (req, res) => {
  res.render("resetPassword", { csrfToken: req.csrfToken() });
});

module.exports = router;
