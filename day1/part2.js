const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const numberDictionary = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const calibrationValues = input.split("\n").map((line) => {
  const matches = line.match(
    /([0-9]|one|two|three|four|five|six|seven|eight|nine)(?:.*([0-9]|one|two|three|four|five|six|seven|eight|nine))?/
  );
  if (!matches) return 0;

  const s1 = matches[1];
  const s2 = matches[2] !== undefined ? matches[2] : matches[1];

  return parseInt(
    (numberDictionary[s1] ?? s1) + (numberDictionary[s2] ?? s2),
    10
  );
});
const sum = calibrationValues.reduce((prev, curr) => prev + curr, 0);

console.log(`The sum is ${sum}`);
