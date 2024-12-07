const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const map = input
  .split("\n")
  .map((item) => item.split("").map((tile) => ({ tile })));

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

let possibleObstructions = 0;

for (let y = 0; y < map.length; y++) {
  console.log(`Processing ${(((y + 1) / map.length) * 100).toFixed(2)}%`);

  for (let x = 0; x < map[y].length; x++) {
    const mapClone = JSON.parse(JSON.stringify(map));

    if (mapClone[y][x].tile !== ".") {
      continue;
    }
    mapClone[y][x].tile = "#";

    // 0 = top
    // 1 = right
    // 2 = bottom
    // 3 = left
    let direction = 0;
    let guardPosition = { x: 0, y: 0 };

    // get initial guard position
    for (let y = 0; y < mapClone.length; y++) {
      for (let x = 0; x < mapClone[y].length; x++) {
        if (mapClone[y][x].tile === "^") {
          guardPosition = { x, y };
          mapClone[y][x].tile = "X";
          mapClone[y][x][`guardDirection0`] = true;
        }
      }
    }

    while (true) {
      const newPosition = getNewPosition(guardPosition, direction);

      if (!mapClone[newPosition.y]?.[newPosition.x]) break;

      if (mapClone[newPosition.y][newPosition.x].tile === "#") {
        direction = (direction + 1) % 4;
        continue;
      }

      if (
        mapClone[newPosition.y][newPosition.x][`guardDirection${direction}`]
      ) {
        possibleObstructions++;
        break;
      }

      guardPosition = newPosition;
      mapClone[newPosition.y][newPosition.x].tile = "X";
      mapClone[newPosition.y][newPosition.x][
        `guardDirection${direction}`
      ] = true;
    }

    // console.log(
    //   mapClone.map((item) => item.map((item) => item.tile).join("")).join("\n"),
    //   "\n"
    // );
  }
}

console.log(JSON.stringify(possibleObstructions));
