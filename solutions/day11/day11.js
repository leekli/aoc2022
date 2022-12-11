// AOC - DAY 11 🎄

const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split(/\r?\n/)
  .filter((element) => element);

// Function to take all the monkey moves input and turn it into an object
const buildMonkeyInfoObject = () => {
  const monkeyMovePlan = {};

  let currentMonkey = 0;

  for (let line of input) {
    line = line.split(" ");
    if (line.includes("Monkey")) {
      currentMonkey = Number(line[1].replace(/:/g, ""));
      monkeyMovePlan[currentMonkey] = {};
    }
    if (line.includes("Starting")) {
      monkeyMovePlan[currentMonkey].items = new Array();
      for (let i in line) {
        if (parseInt(line[i])) {
          monkeyMovePlan[currentMonkey].items.push(parseInt(line[i]));
        }
      }
    }
    if (line.includes("Operation:")) {
      monkeyMovePlan[currentMonkey].operation = function (num) {
        if (line[7] === "old") {
          return eval(`${num} ${line[6]} ${num}`);
        } else {
          return eval(`${num} ${line[6]} ${line[7]}`);
        }
      };
    }
    if (line.includes("Test:")) {
      monkeyMovePlan[currentMonkey].test = {};
      monkeyMovePlan[currentMonkey].test.try = Number(line[5]);
    }
    if (line.includes("true:")) {
      monkeyMovePlan[currentMonkey].test.ifTrue = Number(line[9]);
    }
    if (line.includes("false:")) {
      monkeyMovePlan[currentMonkey].test.ifFalse = Number(line[9]);
    }
    monkeyMovePlan[currentMonkey].totalMoves = 0;
  }

  return monkeyMovePlan;
};

// Create object with monkey info in
const monkeyPlay = buildMonkeyInfoObject();

// Function to play a round of the game
const play = (monkeyMoves, roundsToPlay, worryMetric) => {
  // Calculate total divisors
  const calcDivisors = () => {
    let totalDivs = 1;

    for (let monkey in monkeyMoves) {
      totalDivs *= monkeyMoves[monkey].test.try;
    }

    return totalDivs;
  };

  while (roundsToPlay !== 0) {
    for (let monkey in monkeyMoves) {
      for (let i = 0; i < monkeyMoves[monkey].items.length; i++) {
        let currentItem = monkeyMoves[monkey].items[i];
        let worryLevel = monkeyMoves[monkey].operation(currentItem);

        if (worryMetric === "high") {
          worryLevel = Math.floor(worryLevel / 3);
        }
        if (worryMetric === "low") {
          const getDivisorsTotal = calcDivisors();
          worryLevel = worryLevel % getDivisorsTotal;
        }

        if ((worryLevel % monkeyMoves[monkey].test.try !== 0) === true) {
          let monkeyToMoveTo = monkeyMoves[monkey].test.ifFalse;
          monkeyMoves[monkeyToMoveTo].items.push(worryLevel);
        }
        if ((worryLevel % monkeyMoves[monkey].test.try !== 0) === false) {
          let monkeyToMoveTo = monkeyMoves[monkey].test.ifTrue;
          monkeyMoves[monkeyToMoveTo].items.push(worryLevel);
        }

        monkeyMoves[monkey].totalMoves += 1;

        if (i === monkeyMoves[monkey].items.length - 1) {
          let k = monkeyMoves[monkey].items.length;
          while (k !== 0) {
            monkeyMoves[monkey].items.shift();
            k--;
          }
        }
      }
    }
    roundsToPlay--;
  }

  const countTotalMonkeyBusiness = () => {
    let tempArray = [];

    for (let monkey in monkeyMoves) {
      tempArray.push(monkeyMoves[monkey].totalMoves);
    }

    tempArray.sort((a, b) => {
      return b - a;
    });

    return tempArray[0] * tempArray[1];
  };

  return countTotalMonkeyBusiness();
};

console.log("Part 1:", play(monkeyPlay, 20, "high")); // 57838
console.log("Part 2:", play(monkeyPlay, 10000, "low")); // 15050382231
