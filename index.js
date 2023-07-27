var fs = require("fs");

const files = ['1', '2', '3', '4', '5'];
files.forEach(fileNumber => {
  const data = fs.readFileSync(`./${fileNumber}.txt`, { encoding: "utf8", flag: "r" });
  let lines = data.split("\r\n\r\n");



  }
)