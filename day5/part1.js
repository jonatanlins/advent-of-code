const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const lines = input.split("\n");

let seeds = [];
let maps = {};
let readingMap = "";
const mapOrder = [
  "seed-to-soil",
  "soil-to-fertilizer",
  "fertilizer-to-water",
  "water-to-light",
  "light-to-temperature",
  "temperature-to-humidity",
  "humidity-to-location",
];

for (const line of lines) {
  if (!line.trim()) continue;

  const seedsMatch = line.match(/^seeds: +(\d+(?: +\d+)*)$/);
  if (seedsMatch) {
    seeds = seedsMatch[1]
      .split(/\s+/)
      .map((seed) => ({ seed: parseInt(seed, 10) }));
    continue;
  }

  const mapStartMatch = line.match(/^([a-zA-Z-]+) map:$/);
  if (mapStartMatch) {
    readingMap = mapStartMatch[1];
    maps[readingMap] = [];
    continue;
  }

  const mapMatch = line.match(/^(\d+(?: +\d+)*)$/);
  if (mapMatch) {
    maps[readingMap].push(mapMatch[1].split(/\s+/).map((n) => parseInt(n, 10)));
    continue;
  }
}

for (const seed of seeds) {
  for (const currentMap of mapOrder) {
    const [_, sourceName, destinationName] =
      currentMap.match(/^(\w+)-to-(\w+)$/);
    const source = seed[sourceName];
    let destination = source;

    for (const map of maps[currentMap]) {
      const [destinationRangeStart, sourceRangeStart, rangeLength] = map;
      if (
        sourceRangeStart <= source &&
        source <= sourceRangeStart - 1 + rangeLength
      ) {
        destination = source - sourceRangeStart + destinationRangeStart;
        break;
      }
    }

    seed[destinationName] = destination;
  }
}

let answer = seeds.reduce(
  (prev, curr) => Math.min(prev, curr.location),
  Number.MAX_SAFE_INTEGER
);

console.log(`The answer is ${answer}`);
