const fs = require("fs");

const lines = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .trim()
  .split("\n");

function getInput() {
  const res = {
    start: {},
    end: {},
    map: [],
  };
  res.map = lines.map((line, y) =>
    [...line].map((value, x) => {
      if (value === "S") {
        res.start = {
          y,
          x,
        };
        return 0;
      }
      if (value === "E") {
        res.end = { y, x };
        return 25;
      }
      return value.charCodeAt(0) - "a".charCodeAt(0);
    })
  );
  return res;
}

function pointToInt(x, y) {
  return y * 1e3 + x;
}
function intToPoint(int) {
  return {
    y: Math.floor(int / 1e3),
    x: int % 1e3,
  };
}

function getNeighbors(x, y, map) {
  const res = [];
  if (y + 1 < map.length && map[y + 1][x] <= map[y][x] + 1) {
    res.push(pointToInt(x, y + 1));
  }
  if (y - 1 >= 0 && map[y - 1][x] <= map[y][x] + 1) {
    res.push(pointToInt(x, y - 1));
  }
  if (x + 1 < map[y].length && map[y][x + 1] <= map[y][x] + 1) {
    res.push(pointToInt(x + 1, y));
  }
  if (x - 1 >= 0 && map[y][x - 1] <= map[y][x] + 1) {
    res.push(pointToInt(x - 1, y));
  }
  return res;
}

function dijkstra(map, start, end) {
  const dist = {};
  const prev = {};
  let queue = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const id = pointToInt(x, y);
      dist[id] = Infinity;
      // prev[pointToInt(x, y)] = ;
      queue.push(id);
    }
  }
  dist[pointToInt(start.x, start.y)] = 0;

  while (queue.length) {
    let u = null;
    for (const current of queue) {
      if (u === null || dist[current] < dist[u]) {
        u = current;
      }
    }
    if (u === pointToInt(end.x, end.y)) {
      break;
    }
    queue = queue.filter((x) => x !== u);

    const point = intToPoint(u);
    const neighbors = getNeighbors(point.x, point.y, map);
    for (const v of neighbors) {
      if (queue.includes(v)) {
        const alt = dist[u] + 1;
        if (alt < dist[v]) {
          dist[v] = alt;
          prev[v] = u;
        }
      }
    }
  }
  return {
    dist,
    prev,
  };
}

function part1() {
  const input = getInput();
  const data = dijkstra(input.map, input.start, input.end);
  const distance = data.dist[pointToInt(input.end.x, input.end.y)];
  console.log(distance);
}

part1();
