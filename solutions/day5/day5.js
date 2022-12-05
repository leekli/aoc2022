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

  // Part 1
  const p1Stack = JSON.parse(JSON.stringify(stack));

  getMovesToMake.forEach((move) => {
    const moveToMake = getEachMove([move]);
    for (let i = 1; i <= moveToMake[0]; i++) {
      const removedItem = p1Stack[moveToMake[1]].pop();
      p1Stack[moveToMake[2]].push(removedItem);
    }
  });

  // Part 2
  const p2Stack = JSON.parse(JSON.stringify(stack));

  getMovesToMake.forEach((move) => {
    const moveToMake = getEachMove([move]);
    const removedItem = p2Stack[moveToMake[1]].slice(-moveToMake[0]);
    for (let i = 0; i < moveToMake[0]; i++) {
      p2Stack[moveToMake[1]].pop();
      p2Stack[moveToMake[2]].push(removedItem[i]);
    }
  });

  return { part1: p1Stack, part2: p2Stack };
}

console.log(supplyStacks(day5Input));
