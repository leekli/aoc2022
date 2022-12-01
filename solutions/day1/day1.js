const day1Input = require("./input");

// AOC - DAY 1 🎄

// Part 1
function calorieCounting(calories) {
  const splitCalories = calories.split("\n");
  let currentElfCalorieCount = 0;
  let highestCount = 0;

  splitCalories.forEach((calorieSet) => {
    if (calorieSet !== "") currentElfCalorieCount += Number(calorieSet);
    else {
      if (currentElfCalorieCount > highestCount) {
        highestCount = currentElfCalorieCount;
      }
      currentElfCalorieCount = 0;
    }
  });

  return highestCount;
}

// Part 2
function calorieCountingTop3(calories) {
  const splitCalories = calories.split("\n");
  let currentElfCalorieCount = 0;
  let totalCount = 0;
  const calorieSumsArray = [];

  splitCalories.forEach((calorieSet, index) => {
    if (calorieSet !== "") currentElfCalorieCount += Number(calorieSet);
    else if (calorieSet === "" || index === splitCalories.length - 1) {
      calorieSumsArray.push(currentElfCalorieCount);
      currentElfCalorieCount = 0;
    }
  });

  const sortedSumsArray = calorieSumsArray.sort((a, b) => b - a);

  totalCount = sortedSumsArray[0] + sortedSumsArray[1] + sortedSumsArray[2];

  return totalCount;
}

console.log(calorieCounting(day1Input));
console.log(calorieCountingTop3(day1Input));
