const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const lists = input.split("\n").map((item) => item.split(" ").filter(Boolean));
const leftList = lists.map((item) => item[0]).sort();
const rightList = lists.map((item) => item[1]).sort();

let similarityScore = 0;

for (let i = 0; i < lists.length; i++) {
  similarityScore +=
    leftList[i] * rightList.filter((item) => item === leftList[i]).length;
}

console.log(`The result is ${similarityScore}`);
