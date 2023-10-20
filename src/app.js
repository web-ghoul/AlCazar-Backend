//Packages
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const bodyParser = require("body-parser");

//DB Connection
const DBConnect = require("./DB/connection");

//Routers
const publicRouter = require("./routes/public");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

//Dotenv
require("dotenv").config();

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());
app.use(bodyParser.json());

//Routers
app.use("/api", publicRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);


DBConnect.then((res) => {
  console.log("Database is Connected Successfully!!");
  app.listen(port, console.log(`Server is running on Port ${port}`));
}).catch((err) => {
  console.log(err);
});
