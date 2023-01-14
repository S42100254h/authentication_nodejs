const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/resetPasswordController");

router.post("/forget", resetPasswordController.sendMail);
router.post("/reset", resetPasswordController.resetPassword);

module.exports = router;
