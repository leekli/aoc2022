// AOC - DAY 6 🎅🏻

const fs = require("fs");

function tuningTrouble() {
  const splitData = fs.readFileSync("input.txt", "utf-8").split("");
  const temp = [],
    answers = {};

  //   Part 1
  for (let i = 0; i < splitData.length; i++) {
    temp.push(splitData[i]);
    if (temp.length > 4) temp.shift();
    if (temp.length === 4 && new Set(temp).size === 4) {
      answers["part 1"] = i + 1;
      break;
    }
  }

  // Part 2
  for (let i = 0; i < splitData.length; i++) {
    temp.push(splitData[i]);
    if (temp.length > 14) temp.shift();
    if (temp.length === 14 && new Set(temp).size === 14) {
      answers["part 2"] = i + 1;
      break;
    }
  }

  return answers;
}

console.log(tuningTrouble());
