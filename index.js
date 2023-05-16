var express = require("express");
const multer = require("multer");
var cors = require("cors");
require("dotenv").config();

const upload = multer();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// handle file upload
app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  const fileName = req.file.originalname;
  const fileType = req.file.mimetype;
  const fileSize = req.file.size;
  res.json({ name: fileName, type: fileType, size: fileSize });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
