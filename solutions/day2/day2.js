const day2Input = require("./input.js");

// AOC - DAY 2 🎄

// Part 1
function rockPaperScissors(gameGuide) {
  const splitGameGuide = gameGuide.toUpperCase().split("\n");
  let totalScore = 0;

  const scoreTableLookup = {
    "A X": 4,
    "B Y": 5,
    "C Z": 6,
    "C X": 7,
    "B Z": 9,
    "A Y": 8,
    "A Z": 3,
    "B X": 1,
    "C Y": 2,
  };

  splitGameGuide.forEach((game) => {
    for (let move in scoreTableLookup) {
      if (game === move) totalScore += scoreTableLookup[move];
    }
  });

  return totalScore;
}

// Part 2
function rockPaperScissorsDecoded(gameGuide) {
  const splitGameGuide = gameGuide.toUpperCase().split("\n");
  let totalScore = 0;

  const scoreTableLookup = {
    "A X": 3,
    "B Y": 5,
    "C Z": 7,
    "C X": 2,
    "B Z": 9,
    "A Y": 4,
    "A Z": 8,
    "B X": 1,
    "C Y": 6,
  };

  splitGameGuide.forEach((game) => {
    for (let move in scoreTableLookup) {
      if (game === move) totalScore += scoreTableLookup[move];
    }
  });

  return totalScore;
}

console.log(rockPaperScissors(day2Input));
console.log(rockPaperScissorsDecoded(day2Input));
