// AOC - DAY 10 ❄️

const fs = require("fs");
const input = fs.readFileSync("input-test.txt", "utf-8").split("\n");

const part1 = () => {
  let register = 1,
    cycleNumber = 0,
    signalStrength = 0;

  const checkIsPartOfSignal = (num) => {
    const nums = [20, 60, 100, 140, 180, 220];
    return nums.includes(num) ? true : false;
  };

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "noop") {
      cycleNumber++;
      if (checkIsPartOfSignal(cycleNumber))
        signalStrength += cycleNumber * register;
    }

    if (input[i].startsWith("addx")) {
      for (let j = 0; j < 2; j++) {
        if (j === 0) {
          cycleNumber++;
          if (checkIsPartOfSignal(cycleNumber))
            signalStrength += cycleNumber * register;
        }

        if (j === 1) {
          cycleNumber++;
          if (checkIsPartOfSignal(cycleNumber))
            signalStrength += cycleNumber * register;

          const numToAdjust = Number(input[i].slice(5));
          register += numToAdjust;
        }
      }
    }
  }

  return signalStrength;
};

const part2 = () => {
  const buildCrtScreen = () => {
    const crtScreenBuild = new Array(6);

    for (let i = 0; i < crtScreenBuild.length; i++) {
      crtScreenBuild[i] = new Array(40).fill(".");
    }

    return crtScreenBuild;
  };

  // Build CRT Screen
  const crtScreen = buildCrtScreen();

  let register = 1,
    cycleNumber = 0;

  let startSlice = 0;
  let endSlice = 39;

  for (let i = 0; i < crtScreen.length; i++) {
    let newRow = new Array(40);
    let spriteStartPos = 0;
    let splitInput = input.slice(startSlice, endSlice);

    for (let j = 0; j < crtScreen[i].length; j++) {
      if (j === 0) {
        crtScreen[i][spriteStartPos] = "#";
        crtScreen[i][spriteStartPos + 1] = "#";
        crtScreen[i][spriteStartPos + 2] = "#";
      }

      cycleNumber++;

      if (
        crtScreen[i][j] === "#" ||
        crtScreen[i][j + 1] === "#" ||
        crtScreen[i][j + 2] === "#"
      ) {
        newRow[j] = "#";
      } else {
        newRow[j] = ".";
      }

      for (let k = 0; k < splitInput.length; k++) {
        if (splitInput[k].startsWith("addx")) {
          cycleNumber++;
          if (
            crtScreen[i][j + 1] === "#" ||
            crtScreen[i][j + 2] === "#" ||
            crtScreen[i][j + 3] === "#"
          ) {
            newRow[j + 1] = "#";
          } else {
            newRow[j + 1] = ".";
          }

          const numToAdjust = Number(splitInput[k].slice(5));
          crtScreen[i][spriteStartPos] = ".";
          crtScreen[i][spriteStartPos + 1] = ".";
          crtScreen[i][spriteStartPos + 2] = ".";

          crtScreen[i][spriteStartPos + numToAdjust] = "#";
          //   crtScreen[i][spriteStartPos + numToAdjust + 1] = "#";
          //   crtScreen[i][spriteStartPos + numToAdjust + 2] = "#";
        }
      }
    }

    crtScreen[i] = newRow;
    spriteStartPos = 0;
    startSlice = startSlice + 39 + 1;
    endSlice = endSlice + 39 + 1;
    console.table(crtScreen);
  }
};

console.log("Part 1: ", part1()); // part1
// part2();
