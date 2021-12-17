import { readFileSync } from 'fs';
import { resolve } from 'path';

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf-8')
  .split(',')
  .map(Number);

const fishCount: Record<number, number> = [...Array(9)]
  .reduce((acc, _, idx) => ({ ...acc, [idx]: 0 }), {});

input.forEach(val => {
  fishCount[val]++;
});

for (let i = 0; i < 256; i++) {
  let toAdd = 0;
  for (const [ttl, count] of Object.entries(fishCount)) {
    if (+ttl === 0) {
      toAdd += count;
      fishCount[0] -= count;
    } else {
      fishCount[+ttl] -= count;
      fishCount[+ttl - 1] += count;
    }
  }
  fishCount[8] += toAdd;
  fishCount[6] += toAdd;
}

const sum = (map: typeof fishCount) => Object.values(map).reduce((total, val) => total + val, 0);

console.log(sum(fishCount));
