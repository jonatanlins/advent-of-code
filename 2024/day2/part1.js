const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const reports = input
  .split("\n")
  .map((report) => report.split(" ").map(Number));

let safeReports = reports.length;

for (const report of reports) {
  const isIncreasing = report[1] > report[0];
  for (let i = 1; i < report.length; i++) {
    const isCurrentLevelIncreasing = report[i] > report[i - 1];
    const difference = Math.abs(report[i] - report[i - 1]);
    if (
      isCurrentLevelIncreasing !== isIncreasing ||
      difference < 1 ||
      difference > 3
    ) {
      safeReports--;
      break;
    }
  }
}

console.log(`The result is ${safeReports}`);
