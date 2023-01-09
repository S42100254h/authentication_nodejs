const express = require("express");
const models = require("./models");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await models.user.findOne({
      where: { email: email },
    });

    if (bcrypt.compareSync(password, user.password)) {
      req.session.regenerate(() => {
        req.session.userId = user.id;
        console.log("ログインしました！");
      });
      return res.status(200).json(user);
    } else {
      console.log("パスワードに誤りがあります");
      res.redirect("login");
    }
  } catch (error) {
    console.log("入力内容に誤りがあります");
    res.redirect("login");
  }
});

app.listen(port, () => console.log(`Application listening on port ${port}!`));

module.exports = app;
