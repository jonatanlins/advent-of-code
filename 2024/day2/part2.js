const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const reports = input
  .split("\n")
  .map((report) => report.split(" ").map(Number));

let safeReports = 0;

function verifySafety(report) {
  const isIncreasing = report[1] > report[0];
  for (let i = 1; i < report.length; i++) {
    const isCurrentLevelIncreasing = report[i] > report[i - 1];
    const difference = Math.abs(report[i] - report[i - 1]);
    if (
      isCurrentLevelIncreasing !== isIncreasing ||
      difference < 1 ||
      difference > 3
    ) {
      return false;
    }
  }
  return true;
}

for (const report of reports) {
  if (verifySafety(report)) {
    safeReports++;
  } else {
    for (let i = 0; i < report.length; i++) {
      if (verifySafety(report.toSpliced(i, 1))) {
        safeReports++;
        break;
      }
    }
  }
}

console.log(`The result is ${safeReports}`);
