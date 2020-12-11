const { resolve } = require('path');
const { readFileSync } = require('fs');

const list = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map(line => +line);

const preamble = 25;

let invalid;
let index;

for (let i = preamble; i <= list.length - preamble; i += 1) {
  const slice = list.slice(i - preamble, i)

  const pairs = [];

  for (let j = 0; j < slice.length - 1; j++) {
    for (let k = j + 1; k < slice.length; k++) {
      pairs.push([slice[j], slice[k]]);
    }
  }

  if (!pairs.some(([a, b]) => a + b === list[i])) {
    invalid = list[i];
    index = i;
    break;
  }
}

console.log(invalid)

const precalc = [list[0]]
list
  .slice(1, index)
  .forEach((el, idx) => {
    precalc[idx + 1] = precalc[idx] + el;
  })

for (let i = 0; i < precalc.length; i++) {
  for (let j = i + 1; j < precalc.length; j++) {
    if (precalc[j] - precalc[i] === invalid) {
      const interval = list.slice(i + 1, j + 1).sort((a, b) => a - b);
      const low = interval.shift();
      const high = interval.pop();

      console.log(low + high)
    } 
  }
}
