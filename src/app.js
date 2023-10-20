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

//Facebook Messenger
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature-256"];
  if (!signature) {
    console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
  } else {
    var elements = signature.split("=");
    var signatureHash = elements[1];
    var expectedHash = crypto
      .createHmac("sha256", config.appSecret)
      .update(buf)
      .digest("hex");
    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}

DBConnect.then((res) => {
  console.log("Database is Connected Successfully!!");
  app.listen(port, console.log(`Server is running on Port ${port}`));
}).catch((err) => {
  console.log(err);
});
