//Packages
require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportSetup = require("./utils/passport")
const session = require("express-session")
const cookieParser = require('cookie-parser');
//DB Connection
const DBConnect = require("./DB/connection");

//Routers
// const facebookAuthRouter = require("./routes/facebookAuth");
// const pinterestAuthRouter = require("./routes/pinterestAuth");
const publicRouter = require("./routes/public");
const authenticationRouter = require("./routes/authentication");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");


app.use(helmet());
app.use(
  cors({
    origin: "*",
    credentials: true
  })
);
app.use(cookieParser());
app.use(xss());
app.use(express.json());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));
// app.use(passport.initialize())
// app.use(passport.session())


//Routers
app.get("/", (req, res) => {
  res.send("Hello Server Version 1.1.1");
});
app.use("/api", publicRouter);
app.use("/api/auth", authenticationRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

DBConnect.then(() => {
  console.log("Database is Connected Successfully!!");
  app.listen(port, console.log(`Server is running on Port ${port}`));
}).catch((err) => {
  console.log(err);
});


