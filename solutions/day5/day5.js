// AOC - DAY 5 🎄

const day5Input = require("./input.js");

function supplyStacks(stacksInput) {
  const stack = {
    1: ["R", "N", "P", "G"],
    2: ["T", "J", "B", "L", "C", "S", "V", "H"],
    3: ["T", "D", "B", "M", "N", "L"],
    4: ["R", "V", "P", "S", "B"],
    5: ["G", "C", "Q", "S", "W", "M", "V", "H"],
    6: ["W", "Q", "S", "C", "D", "B", "J"],
    7: ["F", "Q", "L"],
    8: ["W", "M", "H", "T", "D", "L", "F", "V"],
    9: ["L", "P", "B", "V", "M", "J", "F"],
  };

  const getMovesToMake = JSON.stringify(stacksInput).split("\\n").slice(11);

  const getEachMove = (array) => {
    const eachMoveArray = [];
    array.forEach((item) => {
      const eachMove = item.replace('"', "").split(" ");
      eachMoveArray.push(eachMove[1], eachMove[3], eachMove[5]);
    });
    return eachMoveArray;
  };

  const partOne = () => {
    const newStack = JSON.parse(JSON.stringify(stack));

    getMovesToMake.forEach((move) => {
      const moveToMake = getEachMove([move]);
      for (let i = 1; i <= moveToMake[0]; i++) {
        const removedItem = newStack[moveToMake[1]].pop();
        newStack[moveToMake[2]].push(removedItem);
      }
    });
    return newStack;
  };

  const partTwo = () => {
    const newStack = JSON.parse(JSON.stringify(stack));

    getMovesToMake.forEach((move) => {
      const moveToMake = getEachMove([move]);
      const removedItem = newStack[moveToMake[1]].slice(-moveToMake[0]);
      for (let i = 0; i < moveToMake[0]; i++) {
        newStack[moveToMake[1]].pop();
        newStack[moveToMake[2]].push(removedItem[i]);
      }
    });

    return newStack;
  };

  return { part1: partOne(), part2: partTwo() };
}

console.log(supplyStacks(day5Input));
