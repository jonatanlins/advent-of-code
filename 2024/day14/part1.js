const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const robots = input.split("\n").map((l) => {
  const pattern = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/;
  const [px, py, vx, vy] = l
    .match(pattern)
    .splice(1)
    .map((n) => parseInt(n, 10));
  return { px, py, vx, vy };
});

const bathroom = {
  width: 101,
  height: 103,
};
const seconds = 100;

for (const robot of robots) {
  robot.px =
    (((robot.px + robot.vx * seconds) % bathroom.width) + bathroom.width) %
    bathroom.width;
  robot.py =
    (((robot.py + robot.vy * seconds) % bathroom.height) + bathroom.height) %
    bathroom.height;
}

const q1 = robots.filter(
  (r) =>
    r.px < Math.floor(bathroom.width / 2) &&
    r.py < Math.floor(bathroom.height / 2)
).length;
const q2 = robots.filter(
  (r) =>
    r.px >= Math.ceil(bathroom.width / 2) &&
    r.py < Math.floor(bathroom.height / 2)
).length;
const q3 = robots.filter(
  (r) =>
    r.px < Math.floor(bathroom.width / 2) &&
    r.py >= Math.ceil(bathroom.height / 2)
).length;
const q4 = robots.filter(
  (r) =>
    r.px >= Math.ceil(bathroom.width / 2) &&
    r.py >= Math.ceil(bathroom.height / 2)
).length;

const result = q1 * q2 * q3 * q4;

console.log(JSON.stringify(result));
