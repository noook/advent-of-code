const { resolve } = require('path');
const { readFileSync } = require('fs');

const list = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map(line => +line)
  .sort((a, b) => a - b);

const diffs = {
  1: 0,
  3: 0,
};

list.unshift(0);
list.push(list[list.length - 1] + 3);

for (let i = 0; i < list.length - 1; i += 1) {
  diffs[list[i + 1] - list[i]]++;
}

console.log('Part 1:', diffs[1] * diffs[3]);

const nextOptions = {};
for (let i = 0; i < list.length - 1; i += 1) {
  nextOptions[list[i]] = [];

  for (let j = 1; j <= 3; j += 1) {
    if (list[i + j] - list[i] <= 3) {
      nextOptions[list[i]].push(list[i + j]);
    }
  }
}

const paths = {};

function createPath(item, count = 0) {
  if (!nextOptions[item]?.length) return 1;

  if (paths[item]) return paths[item];

  for (let i = 0; i < nextOptions[item].length; i += 1) {
    count += createPath(nextOptions[item][i]);
  }

  paths[item] = count;

  return count;
}

console.log('Part 2:', createPath(list[0]));
