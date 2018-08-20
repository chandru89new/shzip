const fs = require("fs");
const zip = new require("node-zip")();
const ID = require("uneeqid");
const mkdirp = require("mkdirp");
const inputDir = "./src";
const outputDir = "./output";
const files = fs.readFileSync("req.json", "utf-8");
const filesJSON = JSON.parse(files);

filesJSON.forEach(item => {
  item.files.forEach(file => {
    zip.file(
      `${item.type}/${file}`,
      fs.readFileSync(`${inputDir}/${item.type}/${file}`)
    );
  });
});

setTimeout(function() {
  zip.file(`Licence.txt`, fs.readFileSync(`${inputDir}/licence.txt`));
  const data = zip.generate({
    base64: false,
    compression: "DEFLATE"
  });
  ID.length = 16;
  ID.type = "loweralphanumeric";
  const id = ID.generate();
  mkdirp(outputDir);
  fs.writeFileSync(`${outputDir}/bundle-${id}.zip`, data, "binary");
}, 1);
