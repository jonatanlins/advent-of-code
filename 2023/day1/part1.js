const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const calibrationValues = input.split("\n").map((line) => {
  const matches = line.match(/([0-9])(?:.*([0-9]))?/);
  if (!matches) return 0;
  return parseInt(
    matches[1] + (matches[2] !== undefined ? matches[2] : matches[1]),
    10
  );
});

const sum = calibrationValues.reduce((prev, curr) => prev + curr, 0);

console.log(`The sum is ${sum}`);
