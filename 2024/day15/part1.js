const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const map = input
  .split("\n\n")[0]
  .split("\n")
  .map((l) => l.split(""));

const movements = input.split("\n\n")[1].replace(/\n/g, "");
let robot = { x: 0, y: 0 };

function updateRobotPosition() {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "@") {
        robot.y = i;
        robot.x = j;
      }
    }
  }
}

function move(position, velocity) {
  const nextPosition = {
    y: position.y + velocity.y,
    x: position.x + velocity.x,
  };
  const currentTile = map[position.y][position.x];
  const nextTile = map[nextPosition.y][nextPosition.x];

  switch (nextTile) {
    case ".":
      map[position.y][position.x] = ".";
      map[nextPosition.y][nextPosition.x] = currentTile;
      return true;

    case "#":
      return false;

    case "O":
      const hasBoxMoved = move(nextPosition, velocity);
      if (hasBoxMoved) {
        map[position.y][position.x] = ".";
        map[nextPosition.y][nextPosition.x] = currentTile;
      }
      return hasBoxMoved;
  }
}

for (const movement of movements) {
  const velocity = {
    "^": { x: 0, y: -1 },
    ">": { x: 1, y: 0 },
    v: { x: 0, y: 1 },
    "<": { x: -1, y: 0 },
  }[movement];

  updateRobotPosition();
  move(robot, velocity);

  // printCurrentMap(movement);
}

let result = 0;
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === "O") {
      result += 100 * i + j;
    }
  }
}

function printCurrentMap(movement) {
  console.log(map.map((l) => l.join("")).join("\n"), `(${movement})\n`);
}

console.log(JSON.stringify(result));
