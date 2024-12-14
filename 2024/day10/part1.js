const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const map = input
  .split("\n")
  .map((item) => item.split("").map((item) => parseInt(item, 10)));

let trailheads = [];

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === 0) {
      const mapCopy = JSON.parse(JSON.stringify(map));
      trailheads.push(getTrailScore(i, j, mapCopy));
    }
  }
}

function getTrailScore(i, j, map) {
  if (map[i][j] === 9) {
    // i just dont want the 9 to be counted twice so i changed it to other number
    map[i][j] = 999;
    return 1;
  }
  let sum = 0;
  const nextNumber = map[i][j] + 1;
  if (map[i + 1]?.[j] === nextNumber) {
    sum += getTrailScore(i + 1, j, map);
  }
  if (map[i - 1]?.[j] === nextNumber) {
    sum += getTrailScore(i - 1, j, map);
  }
  if (map[i]?.[j + 1] === nextNumber) {
    sum += getTrailScore(i, j + 1, map);
  }
  if (map[i]?.[j - 1] === nextNumber) {
    sum += getTrailScore(i, j - 1, map);
  }
  return sum;
}

const sum = trailheads.reduce((a, b) => a + b, 0);

console.log(JSON.stringify(sum));
