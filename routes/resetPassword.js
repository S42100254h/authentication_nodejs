const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/resetPasswordController");
const resetPasswordValidator = require("../validator/resetPasswordValidator");

router.post("/forget", resetPasswordController.sendMail);
router.post(
  "/reset",
  resetPasswordValidator,
  resetPasswordController.resetPassword
);

module.exports = router;
