const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/resetPasswordController");

router.post("/forget", resetPasswordController.sendMail);

module.exports = router;
