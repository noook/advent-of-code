const { readFileSync } = require('fs');
const { resolve } = require('path');

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf-8').split(',').map(n => +n);

function getValue(list) {
  for (let i = 0; list[i] !== 99; i += 4) {
    const [opcode, a, b, index] = list.slice(i, i + 4);
    if (opcode === 1) {
      list[index] = list[a] + list[b];
    }
    if (opcode === 2) {
      list[index] = list[a] * list[b];
    }
  }

  return list[0];
}

const firstInput = [...input];
firstInput.splice(1, 2, 12, 2)
console.log('Value at first position:', getValue(firstInput));

for (let i = 0; i < 100; i += 1) {
  for (let j = 0; j < 100; j += 1) {
    const testInput = [...input];
    testInput.splice(1, 2, i, j);
    if (getValue(testInput) === 19690720) {
      console.log('Noun:', i, 'Verb:', j, 'Result:', 100 * i + j);
    }
  }
} 

