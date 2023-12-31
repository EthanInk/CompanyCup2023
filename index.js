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
  optimizeOrder(nodesOpt, fileNumber);
}
)

function packagesForTime(travelTime) {
  const fullPackages = Math.floor(travelTime / 10);
    const additionalPackage = Math.round((travelTime % 10)/10);
    const packagesNeeded = fullPackages + additionalPackage;
    return packagesNeeded;
}

function optimizeOrder(nodes, fileNumber){
  let previousNode = [0, 0];
  let textOut = '[';

  let oldTravelTime = 0;
  // let cooldownTimeSum= 0;

  nodes.forEach((node) => {
    let travelTime = Math.abs(node[0] - previousNode[0]) + Math.abs(node[1] - previousNode[1]);
    let packagesNeeded = packagesForTime(travelTime)
    console.log(travelTime);
    console.log('Packages: ' + packagesNeeded);
    textOut += `[${packagesNeeded}, [(${node[0]}, ${node[1]})]],`;
    oldTravelTime = travelTime;
    console.log('==================');
    previousNode = node;
 
  });

  // console.log('Cooldown packages: ' + packagesForTime(cooldownTimeSum));
  console.log('***********************************');
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

function getPermutations(arr) {
  const result = [];
  let runCount = 0;
  function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  function generatePermutations(startIndex) {
    if(runCount >= 10886400) return;

    if (startIndex === arr.length - 1) {
      result.push([...arr]);
      runCount++;
      return;
    }

    for (let i = startIndex; i < arr.length; i++) {
      swap(arr, startIndex, i);
      generatePermutations(startIndex + 1);
      swap(arr, startIndex, i); // backtrack, restoring the original array
    }
  }

  generatePermutations(0);
  console.log(`count: ${runCount}`);
  return result;
}

function optimizeNodeOrder(nodes) {
  const perms = getPermutations(nodes);
  let minDistance = 9999999999;
  let minDistancePoints;
  perms.forEach((points) => {
    points.unshift([0, 0]);
    let distandce = 0;
    for (let i = 1; i < points.length; i++) {
      distandce += manhattanDistance(points[i], points[i - 1]);
    }
    if (distandce < minDistance) {
      minDistance = distandce;
      minDistancePoints = points;}
  });
  minDistancePoints.shift();
  return minDistancePoints;
}


