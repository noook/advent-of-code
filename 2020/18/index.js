const { resolve } = require('path');
const { readFileSync } = require('fs');
const expressions = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8').split('\n');

/**
 * @param {string} operations 
 */
const plusPriority = /(?<!\()(\d+\s\+\s\d+)(?!\))/g
function calculate(operations, addFirst = false) {
  if (addFirst) {
    while (operations.match(plusPriority) !== null) {
      operations = operations.replace(plusPriority, match => calculate(match));
    }
  }
  const line = operations.split(' ');
  let acc = +line.shift();

  for (let i = 0; i < line.length; i += 1) {
    if (isNaN(parseInt(line[i]))) {
      const operator = line[i];

      if (operator === '+') {
        acc += +line[++i];
      } else if (operator === '*') {
        acc *= +line[++i];
      }
    }
  }
  return acc;
}

const priorityRegex = /\((?<operation>[^()]+(?=\)))\)/g;
/**
 * @param {string} str 
 */
function resolvePriorities(str, addFirst = false) {
  while (str.match(priorityRegex) !== null) {
    str = str.replace(priorityRegex, match => {
      return calculate(match.slice(1, -1), addFirst);
    });
  }

  return calculate(str, addFirst);
}

const total = expressions
  .reduce((acc, expression) => acc + resolvePriorities(expression), 0);
console.log('Part 1:', total);

const total2 = expressions
  .reduce((acc, expression) => acc + resolvePriorities(expression, true), 0);
console.log('Part 2:', total2);
