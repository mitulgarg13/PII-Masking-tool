const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const upload = multer();

app.use(cors());
app.use("/static", express.static(path.join(__dirname, "static")));

app.post("/upload", upload.single("image"), (req, res) => {
  return res.json({
    maskedImageUrl: "http://localhost:5000/static/masked.jpg",
  });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
