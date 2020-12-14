const { resolve, posix } = require('path');
const { readFileSync } = require('fs');

let input = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n');

function getMemorySum(mem) {
  return Object.values(mem).reduce((acc, value) => acc + value, 0);
}

function applyMaskV1(mask, value) {
  const binValue = mask.split('').reduce((acc, maskValue, idx) => {
    return acc += maskValue === 'X' ? value[idx] : maskValue;
  }, '');

  return parseInt(binValue, 2);
}

function applyMaskV2(mask, value) {
  return mask.split('').reduce((acc, maskValue, idx) => {
    if (maskValue === '1') {
      acc += '1';
    } else if (maskValue === '0') {
      acc += value[idx];
    } else {
      acc += 'X';
    }

    return acc;
  }, '');
}

let currentMask;
const memory1 = {};
const memRegex = /^mem\[(?<address>\d+)\]\s=\s(?<value>\d+)$/

input.forEach(line => {
  if ((matches = line.match(memRegex)) === null) {
    currentMask = line.split(' = ')[1];
  } else {
    const bin = (+matches.groups.value).toString(2).padStart(currentMask.length, '0');

    memory1[matches.groups.address] = applyMaskV1(currentMask, bin);
  }
})

console.log('Part 1:', getMemorySum(memory1));

const memory2 = {}
input.forEach(line => {
  if ((matches = line.match(memRegex)) === null) {
    currentMask = line.split(' = ')[1];
  } else {
    const binAddr = (+matches.groups.address).toString(2).padStart(currentMask.length, '0');
    const value = +matches.groups.value;

    const result = applyMaskV2(currentMask, binAddr);
    const countMatches = result.match(/x/gi);

    for (let i = 0; i < 2 ** countMatches.length; i += 1) {
      const binArr = i.toString(2).padStart(countMatches.length, '0');
      const option = countMatches
        .reduce((acc, _, idx) => acc.replace('X', binArr[idx]), result);

      memory2[option] = value
    }
  }
})

console.log('Part 2:', getMemorySum(memory2));
