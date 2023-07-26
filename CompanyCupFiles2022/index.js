const fs = require("fs");

const { Node, PriorityQueue, WeightedGraph } = require("./dijkstra");
const { uclid, erf, travleScore } = require('./travleScore');

const files = ['1', '2', '3', '4', '5'];
files.forEach(fileNumber => {
  const data = fs.readFileSync(`./${fileNumber}.txt`, { encoding: "utf8", flag: "r" });

  let lines = data.split("\r\n\r\n");

  const stepAllowance = parseInt(lines[0].match(/\d+/)[0]);

  const coalLines = lines[1].split("\r\n");
  const coalQuota = parseInt(coalLines[0].match(/\d+/)[0]);
  const coalPositions = coalLines.filter((_, i) => i !== 0).map(s => s.split(',').map(Number));

  const fishLines = lines[2].split("\r\n");
  const fishQuota = parseInt(fishLines[0].match(/\d+/)[0]);
  const fishPositions = fishLines.filter((_, i) => i !== 0).map(s => s.split(',').map(Number));

  const steelLines = lines[3].split("\r\n");
  const steelQuota = parseInt(steelLines[0].match(/\d+/)[0]);
  const steelPositions = steelLines.filter((_, i) => i !== 0).map(s => s.split(',').map(Number));

  const quotas = lines[4]
    .split("\r\n")[0]
    .replace("Quota=", "")
    .split(",")
    .map(Number);

  const mapLines = lines[5].split("\r\n");
  const mapSize = mapLines[0].replace("map_size=", "").split(",").map(Number);

  const map = new Array(mapSize[0]);
  for (let i = 0; i < mapSize[0]; i++) {
    map[i] = mapLines[i + 1].split(",");
  }

  const obj_map = new Array(mapSize[0]);
  for (let i = 0; i < mapSize[0]; i++) {
    obj_map[i] = new Array(mapSize[1]);
    for (let j = 0; j < mapSize[1]; j++) obj_map[i][j] = { terrain: map[i][j] };
  }

  const weightedGraph = new WeightedGraph();

  for (let i = 0; i < mapSize[0]; i++) {
    for (let j = 0; j < mapSize[1]; j++) {
      const element = obj_map[i][j];
      weightedGraph.addVertex(`${i},${j}`);
    }
  }

  const terrainMap = {
    S: 1,
    I: 5,
    TS: 10,
    M: 15,
  };
  for (let i = 0; i < mapSize[0]; i++) {
    for (let j = 0; j < mapSize[1]; j++) {
      //right
      if (obj_map[i][j + 1]) {
        const terrainRight = obj_map[i][j + 1].terrain;

        weightedGraph.addEdge(
          `${i},${j}`,
          `${i},${j + 1}`,
          terrainMap[terrainRight]
        );
      }

      //down
      if (obj_map[i + 1] && obj_map[i + 1][j]) {
        const terrainBottom = obj_map[i + 1][j].terrain;
        weightedGraph.addEdge(
          `${i},${j}`,
          `${i + 1},${j}`,
          terrainMap[terrainBottom]
        );
      }
    }
  }

    let currentPos = [0,0];
    let path = [[0,0]];
    let closestPos = [];
    let closestLength = 0;
    let forList = -1;
    let forListPos = -1;
    quotas[0] = quotas[0]/2;
    quotas[1] = quotas[1]/2;
    quotas[2] = quotas[2]/2;
  // 1 , 2 , 3
  while((coalPositions.length || steelPositions.length || fishPositions.length) && (stepAllowance > path.length) && (quotas[0] !== 0 || quotas[1] !== 0 || quotas[2] !== 0)){
    if(coalPositions.length){
      coalPositions.forEach((pos,i) => {
        const aPath = weightedGraph.Dijkstra(`${currentPos[0] - 1},${currentPos[1] - 1}`,`${pos[0] - 1},${pos[1] - 1}`).map(x => x.split(',').map(Number));
          if(closestLength < aPath.length){
            closestPos = aPath[aPath.length - 1];
            forList = 1;
            forListPos =  i;
            quotas[0]--;
          }
      });
    }
    if(steelPositions.length){
      steelPositions.forEach((pos,i) => {
        const aPath = weightedGraph.Dijkstra(`${currentPos[0] - 1},${currentPos[1] - 1}`,`${pos[0] - 1},${pos[1] - 1}`).map(x => x.split(',').map(Number));
          if(closestLength < aPath.length){
            closestPos = aPath[aPath.length - 1];
            forList = 2;
            forListPos =  i;
            quotas[3]--;
          }
      });
    }
    if(fishPositions.length){
      fishPositions.forEach((pos,i) => {
        const aPath = weightedGraph.Dijkstra(`${currentPos[0] - 1},${currentPos[1] - 1}`,`${pos[0] - 1},${pos[1] - 1}`).map(x => x.split(',').map(Number));
          if(closestLength < aPath.length){
            closestPos = aPath[aPath.length - 1];
            forList = 3;
            forListPos =  i;
            quotas[1]--;
          }
      });
    }

    if(forList === 1){
      coalPositions.splice(forListPos,1);
    }
    if(forList === 2){
      steelPositions.splice(forListPos,1);
    }
    if(forList === 3){
      fishPositions.splice(forListPos,1);
    }
    let dikPath = weightedGraph.Dijkstra( `${currentPos[0]},${currentPos[1]}`, `${closestPos[0]},${closestPos[1]}`).map(x => x.split(',').map(Number));
    currentPos = closestPos;
    dikPath = dikPath.slice(1,dikPath.length);
    path = [...path,  ...dikPath];
  }
  let dikPathEnd =weightedGraph.Dijkstra(`${currentPos[0]},${currentPos[1]}`, `${mapSize[0] - 1},${mapSize[1] - 1}`).map(x => x.split(',').map(Number));
  dikPathEnd = dikPathEnd.slice(1,dikPathEnd.length);
  path = [...path,  ...dikPathEnd];

  
  const output = {
    Party: ['Gatherer', 'Healer'],
    Path: path
  }

  fs.writeFileSync(`./output${fileNumber}.txt`, JSON.stringify(output));
});

console.log();
