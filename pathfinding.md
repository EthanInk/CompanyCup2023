# Djikstra:
https://www.npmjs.com/package/node-dijkstra

# a-star
https://github.com/andrewrk/node-astar

### Sample usage:
```js
var aStar = require('a-star');

const node_b = {
    name: 'b',
    neighbors: [],
    end: true
}

const node_a = {
    name: 'a',
    neighbors: [node_b],
    distance: new Map([[
        node_b.name, 5
    ]])
}

node_b.neighbors.push(node_a);
node_b.distance =  new Map([[
    node_a.name, 5
]])

const options = {
    start: node_a,
    isEnd: (node) => node.end,
    neighbor: (node) => node.neighbors,
    distance: (nodea, nodeb) => nodea.distance.get(nodeb.name),
    heuristic: () => 0.5,
    hash: (node) => node.name
}
var path = aStar(options);
console.log(path);
```
