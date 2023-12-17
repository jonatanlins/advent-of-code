const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const lines = input.split("\n");

const cards = lines.map((line) => {
  const regExMatches = line.match(
    /^Card +(\d+): +(\d+(?: +\d+)*) +\| +(\d+(?: +\d+)*)$/
  );

  const card = parseInt(regExMatches[1], 10);
  const winningNumbers = regExMatches[2].split(/\s+/);
  const numbersYouHave = regExMatches[3].split(/\s+/);

  const matches = winningNumbers.filter((winningNumber) =>
    numbersYouHave.includes(winningNumber)
  );
  const points = matches.length ? Math.pow(2, matches.length - 1) : 0;
  return points;
});

let answer = cards.reduce((prev, curr) => prev + curr, 0);

console.log(`The answer is ${answer}`);
