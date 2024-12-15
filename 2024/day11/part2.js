const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

let stoneMap = input
  .split(" ")
  .map((n) => parseInt(n, 10))
  .reduce((p, c) => ({ ...p, [c]: p[c] ?? 1 }), {});

const blinks = 75;
let count = 0;

for (let i = 0; i < blinks; i++) {
  for (const [stone, qty] of Object.entries(stoneMap)) {
    if (stone === "0") {
      stoneMap[1] = (stoneMap[1] ?? 0) + qty;
    } else if (stone.length % 2 === 0) {
      const n1 = parseInt(stone.substring(0, stone.length / 2), 10);
      const n2 = parseInt(stone.substring(stone.length / 2), 10);
      stoneMap[n1] = (stoneMap[n1] ?? 0) + qty;
      stoneMap[n2] = (stoneMap[n2] ?? 0) + qty;
    } else {
      const n = parseInt(stone, 10) * 2024;
      stoneMap[n] = (stoneMap[n] ?? 0) + qty;
    }

    stoneMap[stone] -= qty;
    if (stoneMap[stone] <= 0) delete stoneMap[stone];
  }

  count = Object.values(stoneMap).reduce((p, c) => p + c, 0);
  console.log(`blink ${i + 1}:`, count);
}

console.log(`final stones ${count}`);
