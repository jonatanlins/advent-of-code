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
  let possible = true;
  const minimum = {
    red: 0,
    green: 0,
    blue: 0,
  };

  const cubes = matches[2].match(/(\d+) (\w+)/g);
  for (let i = 0; i < cubes.length; i++) {
    const matches = cubes[i].match(/(\d+) (\w+)/);
    const quantity = parseInt(matches[1], 10);
    const color = matches[2];

    if (quantity > maxCubes[color]) {
      possible = false;
    }
    if (quantity > minimum[color]) {
      minimum[color] = quantity;
    }
  }

  const power = minimum.red * minimum.green * minimum.blue;

  return { gameId, possible, power };
});

const powerSum = games.reduce((prev, curr) => prev + curr.power, 0);

console.log(`The answer is ${powerSum}`);
