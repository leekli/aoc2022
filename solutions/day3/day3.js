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

// Part 2
function mostCommonBagdes(rucksackList) {
  const splitRuckSackList = rucksackList.split("\n");
  let sumTotal = 0;

  const splitRuckSacksBy3 = 3;
  for (let i = 0; i < splitRuckSackList.length; i += splitRuckSacksBy3) {
    const split = splitRuckSackList.slice(i, i + splitRuckSacksBy3);
    let mostCommonLetter = "";
    for (let j = 0; j < split.length; j++) {
      let allCharsIn3Rucksacks = [
        ...new Set(split[0] + split[1] + split[2]),
      ].join("");

      for (let char of allCharsIn3Rucksacks) {
        if (
          split[0].includes(char) &&
          split[1].includes(char) &&
          split[2].includes(char)
        ) {
          mostCommonLetter = char;
        }
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
