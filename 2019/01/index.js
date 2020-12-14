const { readFileSync } = require('fs');
const { resolve } = require('path');

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf-8').split('\n').map(n => +n);

const result = input
  .reduce((acc, el) => {
    return acc + (Math.floor(el / 3) - 2);
  }, 0);

function getFuelRequirements(mass) {
  const calc = Math.max(0, Math.floor(mass / 3) - 2);
  return calc ? calc + getFuelRequirements(calc) : 0;
}

console.log('Required fuel:', result);
console.log('Real required fuel', input.reduce((acc, mass) => acc + getFuelRequirements(mass), 0))