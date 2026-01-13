/**
 *  run this by using:
 *  npx nodemon the-rise.js
 */

const express = require("express");
const app = express();
const crypto = require("crypto");

let port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("the-rise/index");
});

app.get("/part2", function (req, res) {
  res.render("the-rise/part2");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
