// AOC - DAY 9 🎄

const fs = require("fs");

const moveList = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((move) => move.split(" "));

const directionsLookup = {
  U: [0, -1],
  D: [0, 1],
  L: [-1, 0],
  R: [1, 0],
};

const makeMoves = (moves, length) => {
  // Set up rope & create 2D Array
  const rope = new Array(length);
  for (let i = 0; i < rope.length; i++) {
    rope[i] = [0, 0];
  }

  // Set to keep track of unique locations the tail has visited
  const tailVisited = new Set();

  // Function to deal with tail move
  const moveTail = (head, tail) => {
    let x_diff = head[0] - tail[0];
    let y_diff = head[1] - tail[1];
    let old_x,
      old_y = tail;

    if (Math.abs(x_diff) === 2 && Math.abs(y_diff) === 2) {
      tail[0] += Math.floor(x_diff / 2);
      tail[1] += Math.floor(y_diff / 2);
    } else {
      if (Math.abs(x_diff) === 2) {
        tail[0] += Math.floor(x_diff / 2);
        tail[1] = head[1];
      } else if (Math.abs(y_diff) === 2) {
        tail[1] += Math.floor(y_diff / 2);
        tail[0] = head[0];
      }
    }

    let new_x,
      new_y = tail;

    return new_x !== old_x || new_y !== old_y;
  };

  // Work through each move
  for (let i = 0; i < moves.length; i++) {
    let [direction, stepsToTake] = moves[i];
    stepsToTake = Number(stepsToTake);

    tailVisited.add(String(rope[rope.length - 1]));

    let moved = false;

    // Move the head of the rope for each move/step
    for (let j = 0; j < stepsToTake; j++) {
      rope[0] = [
        rope[0][0] + directionsLookup[direction][0],
        rope[0][1] + directionsLookup[direction][1],
      ];
      moved = true;

      if (moved === true) {
        moved = moveTail(rope[0], rope[rope.length - 1]);
        tailVisited.add(String(rope[rope.length - 1]));
      }
    }
  }

  return tailVisited.size;
};

// console.log(makeMoves(moveList, 2), "part 1"); // Part 1
console.log(makeMoves(moveList, 10), "part 2"); // Part 2
