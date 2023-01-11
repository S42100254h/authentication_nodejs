const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/resetPasswordController");

router.get("/reset", (req, res) => {
  res.render("resetPassword", { csrfToken: req.csrfToken() });
});

router.post("/reset", resetPasswordController.sendMail);

module.exports = router;
