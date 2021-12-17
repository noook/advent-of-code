import { readFileSync } from 'fs';
import { resolve } from 'path';

const [sequenceStr, mapEntries] = readFileSync(resolve(__dirname, './input.txt'), 'utf-8')
  .split('\n\n');

const sequence = sequenceStr.split('');
const firstLetter = sequence[0];
const lastLetter = sequence[sequence.length - 1];

const map = mapEntries.split('\n').reduce((acc, line) => {
  const [pair, value] = line.split(' -> ');
  acc[pair] = value;

  return acc;
}, {});

const letterCount: Record<string, number> = {};

function incrementChain(map: typeof letterCount, chain: string, count: number = 1) {
  if (!map[chain]) {
    map[chain] = 0;
  }
  map[chain] += count;
}

for (let i = 0; i < sequence.length - 1; i += 1) {
  const slice = sequence.slice(i, i + 2).join('');
  incrementChain(letterCount, slice);
}

console.log(letterCount);

for (let i = 0; i < 40; i += 1) {
  const oldLetterCount = { ...letterCount };
  const entries = Object.entries(letterCount).filter(([, count]) => count > 0).map(([key]) => key);
  entries.forEach(entry => {
    const separator = map[entry];
    const count = oldLetterCount[entry];
    letterCount[entry] -= count;

    for (const part of [`${entry[0]}${separator}`, `${separator}${entry[1]}`]) {
      incrementChain(letterCount, part, count);
    }
  })
  console.log(letterCount);
}

console.log(Object.values(letterCount).reduce((total, value) => total + value, 0));

const singleLetterCount: Record<string, number> = {};

Object.entries(letterCount).forEach(([pair, count]) => {
  pair.split('').forEach(letter => {
    if (singleLetterCount[letter] === undefined) {
      singleLetterCount[letter] = 0
    }
    singleLetterCount[letter] += count;
  });
});

singleLetterCount[firstLetter]++;
singleLetterCount[lastLetter]++;

console.log({singleLetterCount});

const sortedLetters = Object.entries(singleLetterCount).sort((a, b) => a[1] - b[1]);
console.log(sortedLetters);
const [, least] = sortedLetters.shift();
const [, most] = sortedLetters.pop();
console.log((most / 2) - (least / 2));

// console.log(sequence.join(''));
