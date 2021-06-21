var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
var app = express();
var path = require("path");
// const formidable = require("formidable");
// require("dotenv").config();
// const client = require("twilio")(accountSid, authToken);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static("public"));

app.post("/signup-checkout", async (req, res) => {
  if (req.body.email.indexOf("@") == -1) {
    return res.status(500).send({ error: "Email is invalid" });
  }
  // Clean Contact Info
  var email = req.body.email
    .trim()
    .toLowerCase()
    .replace(/[&\/\\#,+()$~%'":*?<>{}]/g, "")
    .replace(/\s/g, "");
  var fullName = req.body.name;
  var phone = req.body.phone
    .trim()
    .replace(/[^a-zA-Z0-9]/g, "")
    .replace(/\s/g, "");
  var account = {
    _id: new mongoose.Types.ObjectId(),
    name: fullName,
    email,
    phone,
  };
  //Now that the data is cleaned, we need to save to mongo DB
  return res.status(200).send({ success: true });
});

console.log("listening on port 80...");
app.listen(80);
