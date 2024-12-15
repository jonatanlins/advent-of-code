const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

let stones = input.split(" ").map((n) => parseInt(n, 10));

for (let i = 0; i < 25; i++) {
  for (let j = 0; j < stones.length; j++) {
    const nAsString = stones[j].toString();

    if (stones[j] === 0) {
      stones[j] = 1;
    } else if (nAsString.length % 2 === 0) {
      const n1 = parseInt(nAsString.substring(0, nAsString.length / 2), 10);
      const n2 = parseInt(nAsString.substring(nAsString.length / 2), 10);
      stones.splice(j, 1, n1, n2);
      j++;
    } else {
      stones[j] *= 2024;
    }
  }

  // console.log(JSON.stringify(stones));
}

console.log(JSON.stringify(stones.length));
