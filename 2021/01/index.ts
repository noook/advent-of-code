import { readFileSync } from 'fs';
import { resolve } from 'path';

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf-8').split('\n').map(Number);

const range = (start: number, length: number) => [...Array(length)].map((_, idx) => idx + start);
const sum = (arr: number[]) => arr.reduce((total, value) => total + value, 0);

function countIncreasesByGroup(inputList: number[], pairLength: number) {
  let count = 0;

  for (let i = pairLength - 1; i < inputList.length; i += 1) {
    const groups: [number, number] = [
      sum(range(i - pairLength + 1, pairLength).map(idx => inputList[idx])),
      sum(range(i - (pairLength - 1) + 1, pairLength).map(idx => inputList[idx])),
    ];

    if (groups[1] > groups[0]) {
      count++;
    }
  }

  return count;
}

console.log(countIncreasesByGroup(input, 1));
console.log(countIncreasesByGroup(input, 3));
