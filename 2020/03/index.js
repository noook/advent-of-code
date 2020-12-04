const { resolve } = require('path');
const { readFileSync } = require('fs');

const input = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n');

const rowLength = input[0].length;

const patterns = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const [firstTree, ...encounteredTrees] = patterns.reduce((acc, [right, down]) => {
  let trees = 0;

  for (let i = 0, j = 0; i < input.length; i += down, j += right) {
    const value = input[i][j % rowLength];
    if (value === '#') {
      trees++
    }
  }

  acc.push(trees)

  return acc;
}, []);

const total = encounteredTrees.reduce((acc, value) => acc * value, firstTree);

console.log(total);
