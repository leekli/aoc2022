# AOC - DAY 1 (In Python) 🎄🐍

file = open("input.txt", "r")
fileContents = file.read()
file.close()

def calorieCounting(calories):
    split_calories = calories.split("\n")
    current_elf_calorie_count = 0
    highest_score = 0
    
    for calorie_set in split_calories:
        if calorie_set != '':
            current_elf_calorie_count += int(calorie_set)
        else:
            if current_elf_calorie_count > highest_score:
                highest_score = current_elf_calorie_count 
            current_elf_calorie_count = 0 

    return highest_score

def calorieCountingTop3(calories):
    split_calories = calories.split("\n")
    current_elf_calorie_count = 0
    total_count = 0
    calorie_sums_list = []
    
    for calorie_set in split_calories:
        if calorie_set != '':
            current_elf_calorie_count += int(calorie_set)
        elif calorie_set == '':
            calorie_sums_list.append(int(current_elf_calorie_count))
            current_elf_calorie_count = 0
            
    sorted_sums_list = sorted(calorie_sums_list, key=int, reverse=True)

    total_count = sorted_sums_list[0] + sorted_sums_list[1] + sorted_sums_list[2]
    
    return total_count


if __name__ == "__main__":
    print(calorieCounting(fileContents))
    print(calorieCountingTop3(fileContents))