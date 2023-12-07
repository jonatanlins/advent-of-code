const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const lines = input.split("\n");

let possibleGears = lines.map((line) =>
  Array.from(Array(line.length)).map(() => [])
);

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines.length; x++) {
    if (!isNaN(lines[y][x])) {
      const numberStart = x;
      let number = lines[y][x];
      while (!isNaN(lines[y][x + 1])) {
        number += lines[y][x + 1];
        x++;
      }
      const numberEnd = x;

      for (let i = y - 1; i <= y + 1; i++) {
        if (!lines[i]) continue;

        for (let j = numberStart - 1; j <= numberEnd + 1; j++) {
          if (!lines[i][j]) continue;

          if (lines[i][j] === "*") {
            possibleGears[i][j].push(parseInt(number, 10));
          }
        }
      }
    }
  }
}

const gearRatios = possibleGears
  .flat(1)
  .filter((possibleGear) => possibleGear.length === 2)
  .map(([a, b]) => a * b);

const answer = gearRatios.reduce((prev, curr) => prev + curr, 0);

console.log(`The answer is ${answer}`);
