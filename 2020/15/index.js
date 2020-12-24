const { resolve } = require('path');
const { readFileSync } = require('fs');

const input = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8').split(',').map(Number)
const history = [...input].reverse();

function getNumberAtPosition(starting, position) {
  const memory = new Map();
  let i = 0;
  let latest;
  
  for(; i < starting.length; i++) {
    if (latest) memory.set(latest, i);
    latest = starting[i];
  }

  while (i < position) {
    if (memory.has(latest)) {
      const last = memory.get(latest);
      memory.set(latest, i);
      latest = i - last;
    } else {
      memory.set(latest, i);
      latest = 0;
    }
    i++
  }

  return latest;
}


console.log('Part 1:', history[0]);
console.log('For 2020:', getNumberAtPosition(input, 2020))
console.log('For 30_000_000:', getNumberAtPosition(input, 30_000_000));
