const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const result = input;

console.log(JSON.stringify(result));
