const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const grid = input.split("\n"); //.map((row) => row.split(""));

function searchWord(grid) {
  let count = 0;
  for (const row of grid) {
    const matches = row.match(RegExp("XMAS", "g"));
    count += matches?.length ?? 0;
  }
  return count;
}

function rotate180(grid) {
  return grid.map((row) => row.split("").reverse().join("")).reverse();
}

function rotate90(grid) {
  let newGrid = [];
  for (let j = 0; j < grid[0].length; j++) {
    let newRow = "";
    for (let i = grid.length - 1; i >= 0; i--) {
      newRow += grid[i][j];
    }
    newGrid.push(newRow);
  }
  return newGrid;
}

function rotate45(grid) {
  // this is not 100% correct but it kinda works
  let newGrid = [];
  for (let a = grid.length - 1; a >= 0; a--) {
    let newRow = "";
    for (let b = 0; b < grid.length - a; b++) {
      newRow += grid[a + b][b];
    }
    newGrid.push(newRow);
  }
  for (let a = 1; a < grid[0].length; a++) {
    let newRow = "";
    for (let b = 0; b < grid[0].length - a; b++) {
      newRow += grid[b][a + b];
    }
    newGrid.push(newRow);
  }
  return newGrid;
}

const count =
  searchWord(grid) +
  searchWord(rotate180(grid)) +
  searchWord(rotate90(grid)) +
  searchWord(rotate180(rotate90(grid))) +
  searchWord(rotate45(grid)) +
  searchWord(rotate180(rotate45(grid))) +
  searchWord(rotate45(rotate90(grid))) +
  searchWord(rotate180(rotate45(rotate90(grid))));

console.log(JSON.stringify(count));
