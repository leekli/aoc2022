// AOC - DAY 8 🎅🏻

const fs = require("fs");

const fileInput = fs
  .readFileSync("input.txt", "utf-8")
  .split(/\r?\n/)
  .map((nums) => {
    return nums.split("").map(Number);
  });

// Sum all the edge trees first
let visibleTreeCount = 2 * fileInput[0].length + 2 * fileInput.length - 4;

let highestPossScenicScore = 0;

// Count interior trees, edges already accounted for
for (let i = 1; i < fileInput.length - 1; i++) {
  for (let j = 1; j < fileInput[i].length - 1; j++) {
    const currentTree = fileInput[i][j];
    let up = i - 1,
      left = j - 1,
      right = j + 1,
      down = i + 1;
    let blockedTrees = 0;
    let numOfDistanceTrees = [0, 0, 0, 0];

    while (up >= 0) {
      if (fileInput[up][j] < currentTree) {
        numOfDistanceTrees[0] += 1;
      } else {
        numOfDistanceTrees[0] += 1;
        blockedTrees += 1;
        break;
      }
      up--;
    }

    while (down < fileInput.length) {
      if (fileInput[down][j] < currentTree) {
        numOfDistanceTrees[1] += 1;
      } else {
        numOfDistanceTrees[1] += 1;
        blockedTrees += 1;
        break;
      }
      down++;
    }

    while (left >= 0) {
      if (fileInput[i][left] < currentTree) {
        numOfDistanceTrees[2] += 1;
      } else {
        numOfDistanceTrees[2] += 1;
        blockedTrees += 1;
        break;
      }
      left--;
    }

    while (right < fileInput[i].length) {
      if (fileInput[i][right] < currentTree) {
        numOfDistanceTrees[3] += 1;
      } else {
        numOfDistanceTrees[3] += 1;
        blockedTrees += 1;
        break;
      }
      right++;
    }

    // Part 1
    if (blockedTrees < 4) visibleTreeCount += 1;

    // Part 2
    let scenicScore = numOfDistanceTrees.reduce(
      (accumulator, currentValue) => accumulator * currentValue
    );
    if (scenicScore > highestPossScenicScore)
      highestPossScenicScore = scenicScore;
  }
}

console.log({ part1: visibleTreeCount, part2: highestPossScenicScore });
