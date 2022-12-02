const day2Input = require("./input.js");

// AOC - DAY 2 🎄

// Part 1
function rockPaperScissors(gameGuide) {
  const splitGameGuide = gameGuide.toUpperCase().split("\n");
  const splitGameGuideLength = splitGameGuide.length;
  let totalScore = 0;
  let currentMoveSelectedScore = 0;
  let currentRoundScore = 0;

  const moveSelectedScoresLookup = {
    X: 1,
    Y: 2,
    Z: 3,
  };

  for (let i = 0; i < splitGameGuideLength; i++) {
    const myMove = splitGameGuide[i][2];
    currentMoveSelectedScore = moveSelectedScoresLookup[myMove];
    if (
      splitGameGuide[i] === "A X" ||
      splitGameGuide[i] === "B Y" ||
      splitGameGuide[i] === "C Z"
    ) {
      currentRoundScore = 3;
    } else if (
      splitGameGuide[i] === "C X" ||
      splitGameGuide[i] === "B Z" ||
      splitGameGuide[i] === "A Y"
    ) {
      currentRoundScore = 6;
    } else {
      currentRoundScore = 0;
    }

    totalScore += currentMoveSelectedScore + currentRoundScore;
  }

  return totalScore;
}

// Part 2
function rockPaperScissorsDecoded(gameGuide) {
  const splitGameGuide = gameGuide.toUpperCase().split("\n");
  const splitGameGuideLength = splitGameGuide.length;
  let totalScore = 0;
  let currentMoveSelectedScore = 0;
  let currentRoundScore = 0;

  const lookupObject = {
    moveSelectedScore: {
      X: 1,
      Y: 2,
      Z: 3,
    },
    winMove: {
      A: "Y",
      B: "Z",
      C: "X",
    },
    drawMove: {
      A: "X",
      B: "Y",
      C: "Z",
    },
    loseMove: {
      A: "Z",
      B: "X",
      C: "Y",
    },
  };

  for (let i = 0; i < splitGameGuideLength; i++) {
    const opponentMove = splitGameGuide[i][0];
    const myMove = splitGameGuide[i][2];
    if (myMove === "X") {
      const move = lookupObject.loseMove[opponentMove];
      currentMoveSelectedScore = lookupObject.moveSelectedScore[move];
      currentRoundScore = 0;
    }
    if (myMove === "Y") {
      const move = lookupObject.drawMove[opponentMove];
      currentMoveSelectedScore = lookupObject.moveSelectedScore[move];
      currentRoundScore = 3;
    }
    if (myMove === "Z") {
      const move = lookupObject.winMove[opponentMove];
      currentMoveSelectedScore = lookupObject.moveSelectedScore[move];
      currentRoundScore = 6;
    }

    totalScore += currentRoundScore + currentMoveSelectedScore;
  }

  return totalScore;
}

console.log(rockPaperScissors(day2Input));
console.log(rockPaperScissorsDecoded(day2Input));
