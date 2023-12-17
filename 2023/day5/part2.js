const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const lines = input.split("\n");

let ranges = {
  seed: [],
  soil: [],
  fertilizer: [],
  water: [],
  light: [],
  temperature: [],
  humidity: [],
  location: [],
};
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
    ranges.seed = seedsMatch[1]
      .match(/(\d+) +(\d+)/g)
      .map((matchResult) => {
        const [start, range] = matchResult
          .match(/(\d+) +(\d+)/)
          .slice(1)
          .map((n) => parseInt(n, 10));
        return { start, end: start + range - 1 };
      })
      .flat(1);

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
    const map = mapMatch[1].split(/\s+/).map((n) => parseInt(n, 10));
    maps[readingMap].push({
      start: map[1],
      end: map[1] + map[2] - 1,
      modifier: map[0] - map[1],
    });
    continue;
  }
}

mapOrderLoop: for (const currentMap of mapOrder) {
  const [from, to] = currentMap.split("-to-");

  rangesLoop: for (const range of ranges[from]) {
    mapsLoop: for (const map of maps[currentMap]) {
      if (map.start <= range.start && range.end <= map.end) {
        // the range will be fully mapped
        ranges[to].push({
          start: range.start + map.modifier,
          end: range.end + map.modifier,
        });
        continue rangesLoop;
      } else if (
        range.start < map.start &&
        map.start <= range.end &&
        range.end <= map.end
      ) {
        // there will be an unmapped piece left on the left side
        ranges[to].push({
          start: map.start + map.modifier,
          end: range.end + map.modifier,
        });
        ranges[from].push({
          start: range.start,
          end: map.start - 1,
        });
        continue rangesLoop;
      } else if (
        map.start <= range.start &&
        range.start <= map.end &&
        map.end < range.end
      ) {
        // there will be an unmapped piece left on the right side
        ranges[to].push({
          start: range.start + map.modifier,
          end: map.end + map.modifier,
        });
        ranges[from].push({
          start: map.end + 1,
          end: range.end,
        });
        continue rangesLoop;
      } else if (range.start < map.start && map.end < range.end) {
        // there will be an unmapped piece left on each side
        ranges[to].push({
          start: map.start + map.modifier,
          end: map.end + map.modifier,
        });
        ranges[from].push({
          start: range.start,
          end: map.start - 1,
        });
        ranges[from].push({
          start: map.end + 1,
          end: range.end,
        });
        continue rangesLoop;
      }
    }

    ranges[to].push({ ...range });
  }
}

const answer = ranges.location.reduce(
  (prev, curr) => Math.min(prev, curr.start),
  Number.MAX_SAFE_INTEGER
);

console.log(`The answer is ${answer}`);
