// AOC - DAY 7 🎅🏻

const fs = require("fs");

const fileInput = fs.readFileSync("input.txt", "utf-8").split("\n");
const folderContents = {};

// Part 1
const part1 = (input) => {
  const paths = [];
  let p1Total = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "$ cd ..") {
      paths.pop();
    } else if (input[i].startsWith("$ cd")) {
      paths.push(input[i].slice(5));
    } else if (typeof parseInt(input[i]) === "number") {
      const [fileSize] = input[i].split(" ");
      for (let j = 0; j < paths.length; j++) {
        let x = paths.slice(paths[paths.length - 1], j + 1);
        let tempString = "/".concat(x);
        if (!folderContents.hasOwnProperty(tempString)) {
          folderContents[tempString] = 0;
        } else {
          if (!isNaN(Number(fileSize))) {
            folderContents[tempString] += Number(fileSize);
          }
        }
      }
    }
  }

  for (let folder in folderContents) {
    if (folderContents[folder] < 100000) {
      p1Total += folderContents[folder];
    }
  }

  return p1Total;
};

// Part 2
const part2 = () => {
  const totalDiskSpace = 70000000;
  const spaceNeeded = 30000000;
  const currentUnusedSpace = totalDiskSpace - folderContents["//"];
  const spaceToFreeUpTotal = spaceNeeded - currentUnusedSpace;
  const possibleDirsToDelete = [];

  for (let folder in folderContents) {
    if (folderContents[folder] >= spaceToFreeUpTotal) {
      possibleDirsToDelete.push(folderContents[folder]);
    }
  }

  return Math.min(...possibleDirsToDelete);
};

console.log("Part 1:", part1(fileInput), "Part 2: ", part2());
