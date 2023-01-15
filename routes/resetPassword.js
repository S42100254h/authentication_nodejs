const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/resetPasswordController");
const resetPasswordValidator = require("../validator/resetPasswordValidator");
const sendMailValidator = require("../validator/sendMailValidator");

router.post("/forget", sendMailValidator, resetPasswordController.sendMail);
router.post(
  "/reset",
  resetPasswordValidator,
  resetPasswordController.resetPassword
);

module.exports = router;
