const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

let map = input.split("\n").map((l) => l.split(""));

let sum = 0;

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (!map[i][j]) continue;

    const { area, fences } = getRegionDimensions(i, j, map[i][j]);
    const perimeter = [fences.h, fences.v]
      .flat(2)
      .reduce((p, c) => (c ? p + 1 : p), 0);
    const price = area * perimeter;
    sum += price;

    // let visualMap = "";
    // for (let a = 0; a < map.length * 2 + 1; a++) {
    //   for (let b = 0; b < map[1].length * 2 + 1; b++) {
    //     if (
    //       a % 2 === 0 &&
    //       b % 2 === 1 &&
    //       fences.h[Math.floor(a / 2)]?.[Math.floor(b / 2)]
    //     ) {
    //       visualMap += "-";
    //     } else if (
    //       b % 2 === 0 &&
    //       a % 2 === 1 &&
    //       fences.v[Math.floor(a / 2)]?.[Math.floor(b / 2)]
    //     ) {
    //       visualMap += "|";
    //     } else {
    //       visualMap += " ";
    //     }
    //   }
    //   visualMap += "\n";
    // }
    // console.log(visualMap, area, perimeter);
  }
}

function getFencesMap() {
  return {
    h: Array(map.length + 1)
      .fill(0)
      .map(() => Array(map[1].length).fill(false)),
    v: Array(map.length)
      .fill(0)
      .map(() => Array(map[1].length + 1).fill(false)),
  };
}

function getRegionDimensions(i, j, id, fences = getFencesMap()) {
  if (map[i]?.[j] !== id) {
    return { area: 0, fences };
  }

  map[i][j] = null;
  fences.h[i][j] = !fences.h[i][j];
  fences.h[i + 1][j] = !fences.h[i + 1][j];
  fences.v[i][j] = !fences.v[i][j];
  fences.v[i][j + 1] = !fences.v[i][j + 1];

  const t = getRegionDimensions(i - 1, j, id, fences);
  const b = getRegionDimensions(i + 1, j, id, fences);
  const l = getRegionDimensions(i, j - 1, id, fences);
  const r = getRegionDimensions(i, j + 1, id, fences);

  const area = 1 + t.area + b.area + l.area + r.area;

  return { area, fences };
}

console.log(JSON.stringify(sum));
