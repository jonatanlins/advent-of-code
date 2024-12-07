const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const map = input.split("\n").map((item) => item.split(""));

// 0 = top
// 1 = right
// 2 = bottom
// 3 = left
let direction = 0;
let guardPosition = { x: 0, y: 0 };

// get initial guard position
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === "^") {
      guardPosition = { x, y };
      map[y][x] = "X";
    }
  }
}

function getNewPosition({ x, y }, direction) {
  switch (direction) {
    case 0:
      return { x, y: y - 1 };
    case 1:
      return { x: x + 1, y };
    case 2:
      return { x, y: y + 1 };
    case 3:
      return { x: x - 1, y };
  }
}

while (true) {
  const newPosition = getNewPosition(guardPosition, direction);

  if (!map[newPosition.y]?.[newPosition.x]) break;

  if (map[newPosition.y][newPosition.x] === "#") {
    direction = (direction + 1) % 4;
    continue;
  }

  guardPosition = newPosition;
  map[newPosition.y][newPosition.x] = "X";
}

const positions = map.reduce(
  (p, c) => p + c.reduce((p, c) => p + (c === "X" ? 1 : 0), 0),
  0
);

// console.log(map.map((item) => item.join("")).join("\n"));
// console.log(guardPosition);

console.log(JSON.stringify(positions));
