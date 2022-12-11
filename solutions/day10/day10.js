// AOC - DAY 10 ❄️

const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split("\n");

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

  let spriteStartPos = 0;
  let crtRow = 0;
  let crtRowPos = 0;

  const draw = () => {
    if (crtRowPos === 40) {
      crtRowPos = 0;
      crtRow += 1;
    }
    if (
      [spriteStartPos, spriteStartPos + 1, spriteStartPos + 2].includes(
        crtRowPos
      )
    ) {
      crtScreen[crtRow][crtRowPos] = "#";
    }
    crtRowPos += 1;
  };

  for (let i = 0; i < input.length; i++) {
    if (input[i].startsWith("addx")) {
      const numToAdjust = Number(input[i].slice(5));
      for (let j = 0; j < 2; j++) {
        draw();
      }
      spriteStartPos += numToAdjust;
    }
    if (input[i] === "noop") {
      draw();
    }
  }

  return crtScreen.map((crtRow) => crtRow.join("")).join("\n");
};

console.log("Part 1: ", part1()); // Part 1
console.log("Part 2:");
console.log(part2()); // Part 2

/* 
####.#..#.###..####.###....##..##..#....
#....#..#.#..#....#.#..#....#.#..#.#....
###..####.#..#...#..#..#....#.#....#....
#....#..#.###...#...###.....#.#.##.#....
#....#..#.#....#....#....#..#.#..#.#....
####.#..#.#....####.#.....##...###.####.
*/
