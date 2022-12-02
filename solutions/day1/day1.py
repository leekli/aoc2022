# AOC - DAY 1 (In Python) 🎄🐍

file = open("input.txt", "r")
fileContents = file.read()

def calorieCounting(calories):
    splitCalories = calories.split("\n")
    currentElfCalorieCount = 0
    highestScore = 0
    
    for calorieSet in splitCalories:
        if calorieSet != '':
            currentElfCalorieCount += int(calorieSet)
        else:
            if currentElfCalorieCount > highestScore:
                highestScore = currentElfCalorieCount 
            currentElfCalorieCount = 0 

    return highestScore

def calorieCountingTop3(calories):
    splitCalories = calories.split("\n")
    currentElfCalorieCount = 0
    totalCount = 0
    calorieSumsArray = []
    
    for calorieSet in splitCalories:
        if calorieSet != '':
            currentElfCalorieCount += int(calorieSet)
        elif calorieSet == '':
            calorieSumsArray.append(int(currentElfCalorieCount))
            currentElfCalorieCount = 0
            
    sortedSumsArray = sorted(calorieSumsArray, key=int, reverse=True)

    totalCount = sortedSumsArray[0] + sortedSumsArray[1] + sortedSumsArray[2]
    
    return totalCount


if __name__ == "__main__":
    print(calorieCounting(fileContents))
    print(calorieCountingTop3(fileContents))
    file.close()