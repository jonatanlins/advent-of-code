const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

let block = [];
let lastFileId = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i]; j++) {
    if (i % 2) {
      block.push(".");
    } else {
      lastFileId = Math.floor(i / 2);
      block.push(lastFileId);
    }
  }
}

for (let i = lastFileId; i >= 0; i--) {
  const fileStart = block.indexOf(i);
  const fileSize = block.lastIndexOf(i) - fileStart + 1;
  const newStart = block.findIndex((v, i) => {
    for (let j = i; j < i + fileSize; j++) {
      if (block[j] !== ".") return false;
    }
    return true;
  });
  if (newStart >= 0 && newStart < fileStart) {
    block.splice(fileStart, fileSize, ...Array(fileSize).fill("."));
    block.splice(newStart, fileSize, ...Array(fileSize).fill(i));
  }
}

let checksum = 0;

for (let i = 0; i < block.length; i++) {
  if (block[i] === ".") continue;

  checksum += i * block[i];
}

// console.log(block.join(""));
// console.log(block.join("") === "00992111777.44.333....5555.6666.....8888..");
console.log(JSON.stringify(checksum));
