const { resolve } = require('path');
const { readFileSync } = require('fs');

const [rulesList, messagesList] = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8').split('\n\n');

class Solver {
  dict = {};

  constructor(rules) {
    rules
      .split('\n')
      .forEach(line => {
        const [num, instruction] = line.split(': ');

        this.dict[num] = this.parseRule(instruction);
      });
  }

  any(messages, rules) {
    const successes = [];

    rules.forEach(attempt => {
      successes.push(...this.all(messages, attempt));
    });

    return successes;
  }

  all(messages, rules) {
    if (!rules.length || !messages.length) return messages;
    const [fn, arg] = this.dict[rules[0]];
    return this.all(fn(messages, arg), rules.slice(1));
  }

  litteral(messages, rule) {
    const result = [];

    messages.forEach(msg => {
      if (msg.startsWith(rule)) {
        result.push(msg.slice(1));
      }
    });

    return result;
  }

  match(message) {
    const [fn, arg] = this.dict[0];
    const messages = fn([message], arg);

    return messages.some(msg => msg === '');
  }

  parseRule(instruction) {
    let match;

    if ((match = instruction.match(/(a|b)/)) !== null) {
      return [
        this.litteral.bind(this),
        match[1],
      ];
    } else if (instruction.includes('|')) {
      const [left, right] = instruction.split('|');
      return [
        this.any.bind(this),
        [
          left.trim().split(' ').map(Number),
          right.trim().split(' ').map(Number)
        ],
      ];
    } else {
      return [
        this.all.bind(this),
        instruction.trim().split(' ').map(Number)
      ];
    }
  }
}

const rules = new Solver(rulesList)
const solved1 = messagesList.split('\n').reduce((acc, line) => {
  return acc + +rules.match(line)
}, 0);

console.log('Part 1:', solved1);

rules.dict[8] = [rules.any.bind(rules), [[42, 8], [42]]];
rules.dict[11] = [rules.any.bind(rules), [[42, 11, 31], [42, 31]]];

const solved2 = messagesList.split('\n').reduce((acc, line) => {
  return acc + +rules.match(line)
}, 0);

console.log('Part 1:', solved2);
