const express = require("express");
const bodyParser = require("body-parser");
const ipfilter = require("./express-ipfilter").IpFilter;
const app = express();
const shzip = require("./zip.js");
const path = require('path')
const ips = ["127.0.0.1"];

app.use(ipfilter(ips, { mode: "allow" }));

app.get('/output/:path', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/output/', req.params.path));
  // next();
})

app.use(bodyParser.json());

app.post("/", function(req, res) {
  const data = req.body;
  if (!data.length) res.send("No data found");
  const result = shzip(data);
  res.send(result);
});

app.listen("8000", () => {
  console.log("Live on port 8000");
});
