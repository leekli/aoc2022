const day1Input = require("./input");

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

console.log(calorieCounting(day1Input));
