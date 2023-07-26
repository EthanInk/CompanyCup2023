function generatePerm(list, size=list.length) {
    if (size > list.length) return [];
    else if (size == 1) return list.map(d=>[d]); 
    return list.flatMap(d => generate(list.filter(a => a !== d), size - 1).map(item => [d, ...item]));
}
// const list = ["x1,y1","x2,y2","x3,y3"]
// console.log(generate(list,3));
// Output:
// [["x1,y1", "x2,y2", "x3,y3"], ["x1,y1", "x3,y3", "x2,y2"], ["x2,y2", "x1,y1", "x3,y3"], ["x2,y2", "x3,y3", "x1,y1"], ["x3,y3", "x1,y1", "x2,y2"], ["x3,y3", "x2,y2", "x1,y1"]]
// Can use to find a permutaions if we need to visit multiple spots
module.exports = { generatePerm };