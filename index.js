var fs = require("fs");

const files = ['1', '2', '3', '4'];

files.forEach(fileNumber => {
  const data = fs.readFileSync(`./${fileNumber}.txt`, { encoding: "utf8", flag: "r" });
  const nodes = [];
  let lines = data.split("\r\n\r\n");
  const matches = lines[0].match(/(\d+, \d+)/g);
  matches.forEach(m => nodes.push(m.split(', ').map(Number)));
  console.log(nodes);
}
)

function optimizeOrder(nodes){
  
}