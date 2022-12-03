const day3Input = require("./day3Input.js");

// AOC - DAY 3 🎄

// Part 1
function ruckSackReOrg(rucksackList) {
  const splitRuckSackList = rucksackList.split("\n");
  let prioritiesTotalSum = 0;

  splitRuckSackList.forEach((rucksack) => {
    const midPoint = rucksack.length / 2,
      firstHalf = rucksack.slice(0, midPoint).split(""),
      secondHalf = rucksack.slice(midPoint, rucksack.length).split("");

    const repeatedType = secondHalf.filter((item) => {
      return firstHalf.includes(item);
    });

    const uniqueTypesArray = [...new Set(repeatedType)];

    const letterCharCode =
      uniqueTypesArray[0].charCodeAt(0) -
      (uniqueTypesArray[0] === uniqueTypesArray[0].toUpperCase() ? 38 : 96);

    prioritiesTotalSum += letterCharCode;
  });

  return prioritiesTotalSum;
}

// Part 2
function mostCommonBagdes(rucksackList) {
  const splitRuckSackList = rucksackList.split("\n");
  let sumTotal = 0;
  const splitRuckSacksBy3 = 3;

  for (let i = 0; i < splitRuckSackList.length; i += splitRuckSacksBy3) {
    const setOf3RuckSacks = splitRuckSackList.slice(i, i + splitRuckSacksBy3);
    let mostCommonLetter = "";
    let allCharsIn3Rucksacks = [
      ...new Set(setOf3RuckSacks[0] + setOf3RuckSacks[1] + setOf3RuckSacks[2]),
    ].join("");

    for (let char of allCharsIn3Rucksacks) {
      if (
        setOf3RuckSacks[0].includes(char) &&
        setOf3RuckSacks[1].includes(char) &&
        setOf3RuckSacks[2].includes(char)
      ) {
        mostCommonLetter = char;
      }
    }
    let letterCharCode =
      mostCommonLetter.charCodeAt(0) -
      (mostCommonLetter === mostCommonLetter.toUpperCase() ? 38 : 96);
    sumTotal += letterCharCode;
  }
  return sumTotal;
}

console.log(ruckSackReOrg(day3Input), "Part 1 answer");
console.log(mostCommonBagdes(day3Input), "Part 2 answer");
