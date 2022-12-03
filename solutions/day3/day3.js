const day3Input = require("./day3Input.js");

// AOC - DAY 3 🎄

// Part 1
function ruckSackReOrg(rucksackList) {
  const splitRuckSackList = rucksackList.split("\n");
  let prioritiesTotalSum = 0;

  splitRuckSackList.forEach((rucksack) => {
    const midPoint = rucksack.length / 2;
    const firstHalfString = rucksack.slice(0, midPoint).split("");
    const secondHalfString = rucksack
      .slice(midPoint, rucksack.length)
      .split("");

    const repeatedType = secondHalfString.filter((itemType) => {
      return firstHalfString.includes(itemType);
    });

    const repeatedTypesRemoved = new Set(repeatedType);
    const uniqueTypesArray = [...repeatedTypesRemoved];

    const letterCharCode =
      uniqueTypesArray[0].charCodeAt(0) -
      (uniqueTypesArray[0] === uniqueTypesArray[0].toUpperCase() ? 38 : 96);

    prioritiesTotalSum += letterCharCode;
  });

  return prioritiesTotalSum;
}

console.log(ruckSackReOrg(day3Input));
