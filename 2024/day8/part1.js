const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const map = input.split("\n").map((item) => item.split(""));

const antennas = {};

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    const antenna = map[i][j];
    if (map[i][j] !== ".") {
      if (!antennas[antenna]) {
        antennas[antenna] = [];
      }
      antennas[antenna].push([i, j]);
    }
  }
}

for (const antennaType in antennas) {
  for (let i = 0; i < antennas[antennaType].length - 1; i++) {
    for (let j = i + 1; j < antennas[antennaType].length; j++) {
      const antenna1 = antennas[antennaType][i];
      const antenna2 = antennas[antennaType][j];
      const antinode1 = [
        2 * antenna2[0] - antenna1[0],
        2 * antenna2[1] - antenna1[1],
      ];
      const antinode2 = [
        2 * antenna1[0] - antenna2[0],
        2 * antenna1[1] - antenna2[1],
      ];
      if (map[antinode1[0]]?.[antinode1[1]]) {
        map[antinode1[0]][antinode1[1]] = "#";
      }
      if (map[antinode2[0]]?.[antinode2[1]]) {
        map[antinode2[0]][antinode2[1]] = "#";
      }
    }
  }
}

let sum = 0;

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === "#") {
      sum++;
    }
  }
}

// console.log(map.map((i) => i.join("")).join("\n"));

console.log(JSON.stringify(sum));
