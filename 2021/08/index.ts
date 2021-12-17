import { readFileSync } from 'fs';
import { resolve } from 'path';

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf-8')
  .split('\n')
  .map(line => {
    const [patterns, digits] = line.split(' | ');
    return {
      patterns: patterns.split(' ').map(pattern => pattern.split('').sort().join('')),
      digits: digits.split(' ').map(digit => digit.split('').sort().join('')),
    }
  });

type ExtractArray<T> = T extends (infer U)[] ? U : never;

function letterDiff(a: string, b: string) {
  const diff = (a + b).split('').filter((value, idx, arr) => arr.indexOf(value) === idx);
  const output = [];
  for (const letter of diff) {
    if (!(a.includes(letter) && b.includes(letter))) {
      output.push(letter)
    }
  }

  return output.sort();
}

function matchWires(list: ExtractArray<typeof input>) {
  const map: Record<string, number> = {};
  const { patterns } = list

  const one = patterns.find(el => el.length === 2);
  const four = patterns.find(el => el.length === 4);
  const seven = patterns.find(el => el.length === 3);
  const eight = patterns.find(el => el.length === 7);
  const three = patterns.find(el => {
    const diff = letterDiff(el, eight);
    return diff.length === 2 && diff.every(letter => !one.includes(letter));
  });
  const nine = patterns.find(el => {
    const diff = letterDiff(three, el);
    return diff.length === 1 && !one.includes(diff[0]);
  });
  const six = patterns.find(el => {
    const diff = letterDiff(el, eight);
    return diff.length === 1 && one.includes(diff[0]);
  });
  const zero = patterns.find(el => {
    const diff = letterDiff(el, eight);
    return diff.length === 1 && ![nine, six].includes(el);
  })
  const leftSegment = letterDiff(three, eight);
  const five = patterns.find(el => {
    const diff = letterDiff(el, six);
    return diff.length === 1 && leftSegment.includes(diff[0]);
  });


  map[zero] = 0;
  map[one] = 1;
  map[three] = 3;
  map[four] = 4;
  map[five] = 5;
  map[six] = 6;
  map[seven] = 7;
  map[eight] = 8;
  map[nine] = 9;
  const two = patterns.find(el => map[el] === undefined);
  map[two] = 2;

  return map;
}

function countOccurrences(digitsMap: Record<string, number>, digits: string[]) {
  return digits.reduce((total, value) => total + +(digitsMap[value] !== undefined), 0);
}

function calcTotal(digitsMap: Record<string, number>, digits: string[]) {
  try {
    return digits.reduce((numStr, value) => numStr + digitsMap[value].toString(), '');
  } catch (e) {
    debugger;
    throw e;
  }
}

let count = 0;

for (const line of input) {
  const map = matchWires(line);
  count += countOccurrences(map, line.digits);
}
console.log(count);

let count2 = 0;
for (const line of input) {
  const map = matchWires(line);
  try {
    count2 += +calcTotal(map, line.digits);
  } catch (e) {
    debugger;
  }
}
console.log(count2);
