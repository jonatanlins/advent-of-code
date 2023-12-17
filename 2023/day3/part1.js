const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const lines = input.split("\n");

let answer = 0;

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

      let isAdjacentToASymbol = false;
      for (let i = y - 1; i <= y + 1; i++) {
        const substring = (lines[i] ?? "").substring(
          numberStart - 1,
          numberEnd + 2
        );
        if (substring.match(/[^\d\.\n]/)) {
          isAdjacentToASymbol = true;
          break;
        }
      }

      if (isAdjacentToASymbol) {
        answer += parseInt(number, 10);
      }
    }
  }
}

console.log(`The answer is ${answer}`);
