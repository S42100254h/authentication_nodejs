const express = require("express");
const csrf = require("csurf");
const session = require("express-session");
require("dotenv").config();

const app = express();
const port = 3000;

const csrfProtection = csrf({ cookie: false });

app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// ルーティング
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const resetPasswordRouter = require("./routes/resetPassword");
app.use("/", csrfProtection, indexRouter);
app.use("/user", userRouter);
app.use("/password", resetPasswordRouter);

app.listen(port, () => console.log(`Application listening on port ${port}!`));

module.exports = app;
