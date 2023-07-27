const { log } = require("console");
var fs = require("fs");

const files = ["1", "2", "3", "4"];

files.forEach((fileNumber) => {
  const data = fs.readFileSync(`./${fileNumber}.txt`, {
    encoding: "utf8",
    flag: "r",
  });
  const nodes = [];
  let lines = data.split("\r\n\r\n");
  const matches = lines[0].match(/(\d+, \d+)/g);
  matches.forEach(m => nodes.push(m.split(', ').map(Number)));
  const nodesOpt = optimizeNodeOrder(nodes);
  console.log(nodesOpt);
  optimizeOrder(nodesOpt, fileNumber);
}
)

// function optimizeOrder(nodes, fileNumber) {
//   let previousNode = [0, 0];
//   let output = [];
//   nodes.forEach((node) => {
//     let travelTime =
//       Math.abs(node[0] - previousNode[0]) + Math.abs(node[1] - previousNode[1]);
//     const fullPackages = Math.floor(travelTime / 10);
//     const additionalPackage = Math.round((travelTime % 10) / 10);
//     const packagesNeeded = fullPackages + additionalPackage;
//     output.push([packagesNeeded, [node[0], node[1]]]);
//   });
//   console.log(output);
//   fs.writeFileSync(`solution${fileNumber}.txt`, JSON.stringify(output));
// }
function packagesForTime(travelTime) {
  const fullPackages = Math.floor(travelTime / 10);
    const additionalPackage = Math.round((travelTime % 10)/10);
    const packagesNeeded = fullPackages + additionalPackage;
    return packagesNeeded;
}

function optimizeOrder(nodes, fileNumber){
  let previousNode = [0, 0];
  let textOut = '[';
  // let cooldownTime = 0;
  let oldTravelTime = 0;
  nodes.forEach((node) => {
    let travelTime = Math.abs(node[0] - previousNode[0]) + Math.abs(node[1] - previousNode[1]);
    let packagesNeeded = packagesForTime(travelTime)
    const cooldownTime = (packagesNeeded * 10) - travelTime;
    packagesNeeded += cooldownTime > 0 ? packagesForTime(cooldownTime) : 0;

    textOut += `[${packagesNeeded}, [(${node[0]}, ${node[1]})]],`;
    oldTravelTime = travelTime;
    // output.push([${packagesNeeded}, [(${node[0]}, ${node[1]})]);
  });
  textOut = textOut.substring(0,textOut.length -1);
  textOut += ']';
  let solution = '';


  fs.writeFileSync(`solution${fileNumber}.txt`, textOut);
  //console.log(output);
}

function manhattanDistance(point1, point2) {
  return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
}

function generatePerm(list, size = list.length) {
  if (size > list.length) return [];
  else if (size == 1) return list.map((d) => [d]);
  return list.flatMap((d) =>
    generatePerm(
      list.filter((a) => a !== d),
      size - 1
    ).map((item) => [d, ...item])
  );
}

function optimizeNodeOrder(nodes) {
  const perms = generatePerm(nodes);
  let minDistance = 9999999999;
  let minDistancePoints;
  perms.forEach((points) => {
    points.unshift([0, 0]);
    let distandce = 0;
    for (let i = 1; i < points.length; i++) {
      distandce = manhattanDistance(points[i], points[i - 1]);
    }
    if (distandce < minDistance) minDistancePoints = points;
  });
  minDistancePoints.shift();
  minDistancePoints = minDistancePoints.reverse();
  return minDistancePoints;
}


