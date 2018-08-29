module.exports = function(json) {
  const fs = require("fs");
  const mkdirp = require("mkdirp");
  const ID = require("uneeqid");
  const inputFolder = "./input";
  const outputFolder = "./output";
  mkdirp(outputFolder);
  const zip = new require("node-zip")();
  ID.length = 16;
  ID.type = "loweralphanumeric";
  const id = ID.generate();

  json.forEach(item => {
    item.fonts.forEach(file => {
      zip.file(
        `${item.type}/${file}`,
        fs.readFileSync(`${inputFolder}/${item.type}/${file}`)
      );
    });
  });

  const data = zip.generate({
    base64: false,
    compression: "DEFLATE"
  });

  fs.writeFileSync(`${outputFolder}/bundle-${id}.zip`, data, "binary");
  return `bundle-${id}.zip`;
};
