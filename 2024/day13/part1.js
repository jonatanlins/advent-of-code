const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const machines = input.split("\n\n").map((r) => {
  const pattern = /(?:Button [AB]|Prize): X[\+=](\d+), Y[\+=](\d+)/;
  const lines = r.split("\n");
  const extract = (v) =>
    v
      .match(pattern)
      .splice(1)
      .map((n) => parseInt(n, 10));
  return {
    a: extract(lines[0]),
    b: extract(lines[1]),
    prize: extract(lines[2]),
  };
});

let totalCost = 0;

for (const machine of machines) {
  let minCost = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const x = machine.a[0] * i + machine.b[0] * j;
      const y = machine.a[1] * i + machine.b[1] * j;
      if (x === machine.prize[0] && y === machine.prize[1]) {
        const cost = 3 * i + j;
        if (cost < minCost) {
          minCost = cost;
        }
      }
    }
  }

  if (minCost !== Number.MAX_SAFE_INTEGER) {
    totalCost += minCost;
  }
}

console.log(JSON.stringify(totalCost));
