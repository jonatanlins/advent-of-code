const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

let block = [];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i]; j++) {
    if (i % 2) {
      block.push(".");
    } else {
      block.push(Math.floor(i / 2));
    }
  }
}

for (let i = block.length - 1; i >= 0; i--) {
  if (block[i] === ".") continue;

  const newIndex = block.indexOf(".");

  if (newIndex >= i) break;

  block[newIndex] = block[i];
  block[i] = ".";
}

let checksum = 0;

for (let i = 0; i < block.length; i++) {
  if (block[i] === ".") continue;

  checksum += i * block[i];
}

console.log(JSON.stringify(checksum));
