// AOC - DAY 13 🎅🏻

const fs = require("fs");

const packets = fs
  .readFileSync("input.txt", "utf-8")
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .filter((item) => item !== "")
  .map((item) => JSON.parse(item));

const compareItems = (item1, item2, result) => {
  // If both items are a number
  if (typeof item1 === "number" && typeof item2 === "number") {
    if (item1 < item2) {
      result = true;
    }
    if (item1 > item2) {
      result = false;
    }
  }

  // If both items are an array
  if (Array.isArray(item1) && Array.isArray(item2)) {
    for (let data in item1) {
      for (let j = data; j <= data; j++) {
        const itemsCompared = compareItems(item1[data], item2[j]);
        if (itemsCompared) {
          result = true;
        }
      }
    }
  }

  // If item 1 is an array and item 2 is not an array
  if (Array.isArray(item1) && !Array.isArray(item2)) {
    item2 = [item2];
    for (let data in item1) {
      for (let j = data; j <= data; j++) {
        const itemsCompared = compareItems(item1[data], item2[j]);
        if (itemsCompared) {
          result = true;
        }
      }
    }
  }

  // If item 2 is an array and item 1 is not an array
  if (!Array.isArray(item1) && Array.isArray(item2)) {
    item1 = [item1];
    for (let data in item1) {
      for (let j = data; j <= data; j++) {
        const itemsCompared = compareItems(item1[data], item2[j]);
        if (itemsCompared) {
          result = true;
        }
      }
    }
  }
  return result;
};

const part1 = () => {
  let pairsArray = [];
  let total = 0;
  let pairNumber = 0;

  for (let i = 0; i < packets.length; i += 2) {
    const packet1 = packets[i];
    const packet2 = packets[i + 1];
    pairNumber++;

    if (packet1.length < packet2.length) {
      pairsArray.push(pairNumber);
      total += pairNumber;
    } else {
      innerLoop: for (let data in packet1) {
        for (let j = data; j <= data; j++) {
          const itemsCompared = compareItems(packet1[data], packet2[j]);
          if (itemsCompared) {
            pairsArray.push(pairNumber);
            total += pairNumber;
            break innerLoop;
          }
        }
      }
    }
  }

  console.log(pairsArray, "pairsArray");
  console.log("Part 1 Total:", total);
};

// Part 1
part1();
