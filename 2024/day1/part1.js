const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const lists = input.split("\n").map((item) => item.split(" ").filter(Boolean));
const leftList = lists.map((item) => item[0]).sort();
const rightList = lists.map((item) => item[1]).sort();

let totalDistance = 0;

for (let i = 0; i < lists.length; i++) {
  totalDistance += Math.abs(leftList[i] - rightList[i]);
}

console.log(`The result is ${totalDistance}`);
