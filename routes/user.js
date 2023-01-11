const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authUser = require("../middlewares/authUser");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);

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

module.exports = router;
