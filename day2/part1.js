const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const maxCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const games = input.split("\n").map((line) => {
  const matches = line.match(/Game (\d+): (.*)/);
  const gameId = parseInt(matches[1], 10);

  const cubes = matches[2].match(/(\d+) (\w+)/g);
  for (let i = 0; i < cubes.length; i++) {
    const matches = cubes[i].match(/(\d+) (\w+)/);
    const quantity = parseInt(matches[1], 10);
    const color = matches[2];

    if (quantity > maxCubes[color]) {
      return { gameId, possible: false };
    }
  }

  return { gameId, possible: true };
});

const sum = games
  .filter(({ gameId, possible }) => possible)
  .reduce((prev, curr) => prev + curr.gameId, 0);

console.log(`The answer is ${sum}`);
