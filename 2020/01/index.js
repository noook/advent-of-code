const { readFileSync } = require('fs');
const { resolve } = require('path');

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf-8').split('\n').map(n => +n);

function testWithTwo() {
  for (let i = 0; i < input.length; i += 1) {
    for (let j = 0; j < input.length; j += 1) {
      if (i === j) continue;

      if (input[i] + input[j] === 2020) {
        return console.log(input[i] * input[j]);
      }
    }
  }
}

function testWithThree() {
  for (let i = 0; i < input.length; i += 1) {
    for (let j = 0; j < input.length; j += 1) {
      for (let k = 0; k < input.length; k += 1) {
        if (i === j || i === k || j === k) continue;

        if (input[i] + input[j] + input[k] === 2020) {
          return console.log(input[i] * input[j] * input[k]);
        }
      }
    }
  }
}

testWithTwo();
testWithThree();
