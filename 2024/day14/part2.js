const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const robots = input.split("\n").map((l) => {
  const pattern = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/;
  const [px, py, vx, vy] = l
    .match(pattern)
    .splice(1)
    .map((n) => parseInt(n, 10));
  return { px, py, vx, vy };
});

const bathroom = {
  width: 101,
  height: 103,
};

for (let i = 1; i < 10000; i++) {
  const heatmapSize = 3;
  const heatmap = Array(heatmapSize)
    .fill(0)
    .map(() => Array(heatmapSize).fill(0));
  const minHeatToDetectTree = 200;

  for (const robot of robots) {
    robot.px =
      (((robot.px + robot.vx) % bathroom.width) + bathroom.width) %
      bathroom.width;
    robot.py =
      (((robot.py + robot.vy) % bathroom.height) + bathroom.height) %
      bathroom.height;
    heatmap[Math.floor((robot.py / bathroom.height) * heatmapSize)][
      Math.floor((robot.px / bathroom.height) * heatmapSize)
    ]++;
  }

  if (heatmap.flat(1).some((x) => x > minHeatToDetectTree)) {
    printMap(i);
  }
}

function printMap(i) {
  const hr = Array(bathroom.width + 2)
    .fill("█")
    .join("");
  let map = hr + "\n";
  for (let i = 0; i < bathroom.height; i++) {
    map += "█";
    for (let j = 0; j < bathroom.width; j++) {
      if (robots.find((r) => r.py === i && r.px === j)) {
        map += "x";
      } else {
        map += " ";
      }
    }
    map += "█\n";
  }
  map += hr;
  console.log(map);
  console.log(`>>> robots after ${i} seconds\n\n`);
}

console.log(`finished calculating maps`);
