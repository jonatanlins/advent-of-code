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
  const tries = 3 ** (equation.numbers.length - 1);

  for (let i = 0; i < tries; i++) {
    let e = "";
    let r = equation.numbers[0];

    for (let j = 1; j < equation.numbers.length; j++) {
      const option = Math.floor((i / 3 ** (j - 1)) % 3);

      switch (option) {
        case 0:
          e += "*";
          r = r * equation.numbers[j];
          break;
        case 1:
          e += "+";
          r = r + equation.numbers[j];
          break;
        case 2:
          e += "||";
          r = parseInt(`${r}${equation.numbers[j]}`, 10);
          break;
      }
    }

    if (r === equation.result) {
      totalCalibrationResult += equation.result;
      break;
    }
  }
}

console.log(JSON.stringify(totalCalibrationResult));
