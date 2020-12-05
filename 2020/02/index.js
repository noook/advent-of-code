const { resolve } = require('path');
const { readFileSync } = require('fs');

function testOne(entry) {
  // RegEx with the global flags will return an array of n entries containing the n matches it found
  // Counting the matches comes down to counting the occurrences of the letter
  // There might be no occurrence of a letter in the password, which would result in the match being equal to null.
  // We give an empty array instead because the length of an empty array is 0
  const letterCount = (entry.password.match(new RegExp(entry.letter, 'g')) || []).length;
  return entry.start <= letterCount && letterCount <= entry.end;
}

function testTwo(entry) {
  // ^ is the XOR operator (exclusive OR). It means: I want of of the two conditions to be true, but not both.
  // An equivalent would be (a || b) && !(a && b)
  return (entry.password[entry.start - 1] === entry.letter) ^ (entry.password[entry.end - 1] === entry.letter)
}

// Here we named each capturing groups to destructure more easily the matches;
const entryRegex = /^(?<start>\d+)-(?<end>\d+)\s(?<letter>[a-z]):\s(?<password>[a-z]+)$/;

const input = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map(row => {
    // Destructure the matches within named variables
    const { start, end, letter, password } = row.match(entryRegex).groups;

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
