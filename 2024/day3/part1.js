const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const pattern = /mul\((\d{1,3}),(\d{1,3})\)/;

const validInstructions = input.match(RegExp(pattern, "g"));

const sum = validInstructions
  .map((exp) => {
    const matches = pattern.exec(exp);
    return Number(matches[1]) * Number(matches[2]);
  })
  .reduce((a, b) => a + b, 0);

console.log(JSON.stringify(sum));
