const { resolve } = require('path');
const { readFileSync } = require('fs');

const input = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n');

// All rows have the same number of boxes. This will be our base value that will reset our count of
// steps when we reach the right border of the map
const rowLength = input[0].length;

// Here we list our slopes: The left value is the number of steps to the right, the right value is the
// number of steps to the bottom
const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

// Destructure to get the first value of the list as the initial value of the reduce function further
const [firstTree, ...encounteredTrees] = slopes.map(([right, down]) => {
  let trees = 0;

  // Notice our 2 variables initiation, and the 2 variables incrementation
  // We are walking on a map, which can be walked with coordinates like variables
  // we start at the top left corner, and we use i to move to the bottom, and j to
  // move to the right.
  for (let i = 0, j = 0; i < input.length; i += down, j += right) {
    // % resets the number of steps if we reach the end of the line.
    // Walking 9 steps over a line of 6 boxes would come down to walking 3 steps.
    const value = input[i][j % rowLength];
    if (value === '#') {
      trees++
    }
  }

  return trees;
});

// This reduce acts like a list sum of numbers, except we actually multiply each number
// between them. We use the first value of the previous list as a starting point of the reduce,
// as starting with a 0 would always result with a 0.
const total = encounteredTrees.reduce((acc, value) => acc * value, firstTree);

console.log(total);
