const { resolve } = require('path');
const { readFileSync } = require('fs');

function testOne(entry) {
  const letterCount = (entry.password.match(new RegExp(entry.letter, 'g')) || []).length
  return entry.start <= letterCount && letterCount <= entry.end;
}

function testTwo(entry) {
  return (entry.password[entry.start - 1] === entry.letter) ^ (entry.password[entry.end - 1] === entry.letter)
}

const input = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map(row => {
    const [, start, end, letter, password] = row.match(/^(\d+)-(\d+)\s([a-z]):\s([a-z]+)$/);

    return {
      letter,
      password,
      start: +start,
      end: +end,
    };
  });

const valid = input.reduce((valid, entry) => {
  return valid + +testTwo(entry);
}, 0);

console.log(valid);
