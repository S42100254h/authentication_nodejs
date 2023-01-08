const express = require("express");
const models = require("./models");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.post("/register", async (req, res) => {
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

app.listen(port, () => console.log(`Application listening on port ${port}!`));

module.exports = app;
