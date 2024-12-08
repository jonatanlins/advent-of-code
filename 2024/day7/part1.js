const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const equations = input.split("\n").map((item) => ({
  result: parseInt(item.split(": ")[0], 10),
  numbers: item
    .split(": ")[1]
    .split(" ")
    .map((item) => parseInt(item, 10)),
}));

let totalCalibrationResult = 0;

for (const equation of equations) {
  const tries = Math.pow(2, equation.numbers.length - 1);

  for (let i = 0; i < tries; i++) {
    let e = "";
    let r = equation.numbers[0];

    for (let j = 1; j < equation.numbers.length; j++) {
      if (i & Math.pow(2, j - 1)) {
        e += "*";
        r *= equation.numbers[j];
      } else {
        e += "+";
        r += equation.numbers[j];
      }
    }

    if (r === equation.result) {
      totalCalibrationResult += equation.result;
      break;
    }
  }
}

console.log(JSON.stringify(totalCalibrationResult));
