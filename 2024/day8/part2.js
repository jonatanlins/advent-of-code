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

// greatest common divisor
function gcd(a, b) {
  if (!b) return a;
  return gcd(b, a % b);
}

for (const antennaType in antennas) {
  for (let i = 0; i < antennas[antennaType].length - 1; i++) {
    for (let j = i + 1; j < antennas[antennaType].length; j++) {
      const antenna1 = antennas[antennaType][i];
      const antenna2 = antennas[antennaType][j];
      const diffX = antenna2[0] - antenna1[0];
      const diffY = antenna2[1] - antenna1[1];
      const ratio = gcd(Math.abs(diffX), Math.abs(diffY));
      const stepX = diffX / ratio;
      const stepY = diffY / ratio;

      let current = [...antenna1];
      while (map[current[0]]?.[current[1]]) {
        map[current[0]][current[1]] = "#";
        current = [current[0] + stepX, current[1] + stepY];
      }

      current = [antenna1[0] - stepX, antenna1[1] - stepY];
      while (map[current[0]]?.[current[1]]) {
        map[current[0]][current[1]] = "#";
        current = [current[0] - stepX, current[1] - stepY];
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
