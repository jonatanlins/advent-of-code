const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const patterns = {
  mul: /mul\((\d{1,3}),(\d{1,3})\)/,
  do: /do\(\)/,
  dont: /don't\(\)/,
};

const pattern = RegExp(
  Object.values(patterns)
    .map((exp) => exp.toString().replace(/^\//, "(").replace(/\/$/, ")"))
    .join("|")
);

const validInstructions = input.match(RegExp(pattern, "g"));

let sum = 0;
let enabled = true;

for (const instruction of validInstructions) {
  if (patterns.mul.test(instruction)) {
    if (enabled) {
      const matches = patterns.mul.exec(instruction);
      sum += Number(matches[1]) * Number(matches[2]);
    }
  } else if (patterns.do.test(instruction)) {
    enabled = true;
  } else if (patterns.dont.test(instruction)) {
    enabled = false;
  }
}

console.log(JSON.stringify(sum));
