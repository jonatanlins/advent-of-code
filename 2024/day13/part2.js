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
    prize: extract(lines[2]).map((n) => n + 10000000000000),
  };
});

let totalCost = 0;

for (const machine of machines) {
  const a =
    (machine.b[1] * machine.prize[0] - machine.b[0] * machine.prize[1]) /
    (machine.a[0] * machine.b[1] - machine.a[1] * machine.b[0]);
  const b = (machine.prize[0] - a * machine.a[0]) / machine.b[0];

  if (Number.isInteger(a) && Number.isInteger(b)) {
    const cost = 3 * a + b;
    totalCost += cost;
  }
}

console.log(JSON.stringify(totalCost));
