import { readFileSync } from 'fs';
import { resolve } from 'path';

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf-8')
  .split('\n')
  .map(Number);

let min;

function sum(number: number) {
  // for 11: 1 + 2 + 3+ 4 + 5 + 6+ 7 + 8+ 9 +10 + 11
  let total = 0;
  for (let i = 1; i <= number; i++) {
    total += i;
  }
  return total;
}

for (let i = 0; i < input.length; i++) {
  const total = input.reduce((acc, value) => {
    const range = Math.abs(value - i);
    return acc + ((range**2 + range) / 2)
  }, 0);

  if (total < min || !min) {
    min = total;
  }
}

console.log(min)