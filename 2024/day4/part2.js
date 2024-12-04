const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const grid = input.split("\n"); //.map((row) => row.split(""));

let count = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] === "A") {
      const firstMS = [grid[i + 1]?.[j + 1], grid[i - 1]?.[j - 1]]
        .sort()
        .join("");
      const secondMS = [grid[i - 1]?.[j + 1], grid[i + 1]?.[j - 1]]
        .sort()
        .join("");
      if (firstMS === "MS" && secondMS === "MS") {
        count++;
      }
    }
  }
}

console.log(JSON.stringify(count));
