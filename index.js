const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const port = 3000;

app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

const userRouter = require("./routes/user");
app.use("/", userRouter);

app.listen(port, () => console.log(`Application listening on port ${port}!`));

module.exports = app;
