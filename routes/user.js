const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authUser = require("../middlewares/authUser");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

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
