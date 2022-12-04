// AOC - DAY 4 🎄

const day4Input = require("./input.js");

function campCleanup(sectionsList) {
  const splitSectionsList = sectionsList.split("\n").join().split(",");
  const splitSectionsListLength = splitSectionsList.length;
  let part1Total = 0;
  let part2Total = 0;

  const createSectionRange = (start, end) =>
    Array(end - start + 1)
      .fill()
      .map((e, i) => i + start);

  const createIntersection = (elfPair1, elfPair2) => {
    return elfPair1.filter((section) => elfPair2.includes(section));
  };

  const areAssignmentsSharedCheck = (pair1Array, pair2Array) => {
    const [pair1First, pair1Last] = [
      pair1Array[0],
      pair1Array[pair1Array.length - 1],
    ];
    const [pair2First, pair2Last] = [
      pair2Array[0],
      pair2Array[pair2Array.length - 1],
    ];

    if (pair1First >= pair2First && pair1Last <= pair2Last) {
      return true;
    }
    if (pair2First >= pair1First && pair2Last <= pair1Last) {
      return true;
    }
  };

  for (let i = 0; i < splitSectionsListLength; i += 2) {
    const elf1TaskTange = splitSectionsList[i].replaceAll("-", " ").split(" "),
      elf2TaskTange = splitSectionsList[i + 1].replaceAll("-", " ").split(" ");

    const pairOne = createSectionRange(
        parseInt(elf1TaskTange[0]),
        parseInt(elf1TaskTange[1])
      ),
      pairTwo = createSectionRange(
        parseInt(elf2TaskTange[0]),
        parseInt(elf2TaskTange[1])
      );

    const pairsIntersection = createIntersection(pairOne, pairTwo);

    if (areAssignmentsSharedCheck(pairOne, pairTwo)) part1Total += 1;
    if (pairsIntersection.length > 0) part2Total += 1;
  }

  return { "part 1": part1Total, "part 2": part2Total };
}

console.log(campCleanup(day4Input));
