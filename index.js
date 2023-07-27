var fs = require("fs");

const files = ['1', '2', '3', '4'];

files.forEach(fileNumber => {
  const data = fs.readFileSync(`./${fileNumber}.txt`, { encoding: "utf8", flag: "r" });
  const nodes = [];
  let lines = data.split("\r\n\r\n");
  const matches = lines[0].match(/(\d+, \d+)/g);
  matches.forEach(m => nodes.push(m.split(', ').map(Number)));
  console.log(nodes);
  optimizeOrder(nodes);
}
)

function optimizeOrder(nodes){
  let previousNode = [0, 0];
  let output = [];
  nodes.forEach((node) => {
    let travelTime = Math.abs(node[0] - previousNode[0]) + Math.abs(node[1] - previousNode[1]);
    const fullPackages = Math.floor(travelTime / 10);
    const additionalPackage = Math.round((travelTime % 10)/10);
    const packagesNeeded = fullPackages + additionalPackage;
    output.push([packagesNeeded, [node[0], node[1]]])
  });
  console.log(output);
}