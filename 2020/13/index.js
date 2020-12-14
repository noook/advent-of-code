const { resolve } = require('path');
const { readFileSync } = require('fs');

let [timestamp, list] = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n');

// Chinese Remainder Theorem implementation copy pasted from:
// https://stackoverflow.com/a/65275958/8886385
const solveCRT = (remainders, modules) => {
  // Multiply all the modulus
  const prod = modules.reduce((acc, val) => acc * val, 1n);

  return modules.reduce((sum, mod, idx) => {
    // Find the modular multiplicative inverse and calculate the sum
    // SUM( remainder * productOfAllModulus/modulus * MMI ) (mod productOfAllModulus) 
    const p = prod / mod;
    return sum + (remainders[idx] * modularMultiplicativeInverse(p, mod) * p);
  }, 0n) % prod;
}

const modularMultiplicativeInverse = (a, modulus) => {
  // Calculate current value of a mod modulus
  const b = BigInt(a % modulus);

  // We brute force the search for the smaller hipothesis, as we know that the number must exist between the current given modulus and 1
  for (let hipothesis = 1n; hipothesis <= modulus; hipothesis++) {
    if ((b * hipothesis) % modulus == 1n) return hipothesis;
  }

  // If we do not find it, we return 1
  return 1n;
}

timestamp = +timestamp;
const busIds = list.split(',').filter(el => el !== 'x').map(Number);

const interval = busIds
  .map(id => {
    return [id, id - (timestamp % id)];
  })
  .sort((a, b) => a[1] - b[1])
  .shift();

console.log('Part 1:', interval[0] * interval[1]);

const ids = list.split(',').map(el => el === 'x' ? -1 : +el);

const { idsList, modulos } = ids.reduce((acc, value, idx) => {
  if (value < 0) return acc;

  acc.idsList.push(BigInt(value));
  acc.modulos.push(BigInt(value - (idx % value)));

  return acc;
}, { idsList: [], modulos: [] })

const response = solveCRT(modulos, idsList);
console.log('Part 2:', response)