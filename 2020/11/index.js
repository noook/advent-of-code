const { resolve } = require('path');
const { readFileSync } = require('fs');
const { dir } = require('console');

let rows = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n');

function getAdjacentCount(map, x, y) {
  let count = 0;

  for (let i = y - 1; i <= y + 1; i += 1) {
    for (let j = x - 1; j <= x + 1; j += 1) {
      if (!map[i] || !map[i][j]) continue;
      if (i === y && j === x) continue;

      if (map[i][j] === '#') {
        count++
      }
    }
  }
  return count;
}

const directions = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

function getAdjacentCountFurther(map, x, y) {
  let count = 0;

  for (const [dirX, dirY] of directions) {
    for (let realY = y + dirY, realX = x + dirX; map[realY] && map[realY][realX]; realY += dirY, realX += dirX) {
      if (map[realY][realX] === 'L') {
        break;
      }
      if (map[realY][realX] === '#') {
        count++;
        break;
      }
    }
  }
  return count;
}

let hasChanged = true;
let copy;

while (hasChanged) {
  hasChanged = false;
  copy = rows.map(line => line.split(''))

  for (let y = 0; y < rows.length; y += 1) {
    for (let x = 0; x < rows[y].length; x += 1) {
      if (copy[y][x] === '.') continue;

      const adjacent = getAdjacentCountFurther(rows, x, y)

      if (adjacent === 0 && copy[y][x] !== '#') {
        copy[y][x] = '#';
        hasChanged = true;
      } else if (adjacent >= 5 && copy[y][x] !== 'L') {
        copy[y][x] = 'L';
        hasChanged = true;
      }
    }
  }

  rows = copy.map(line => line.join(''));
}

console.log(rows.join('\n').match(/#/g).length);
