const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const registerValidator = require("../validator/registerValidator");

router.post("/register", registerValidator, userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;
