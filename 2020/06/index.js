const { resolve } = require('path');
const { readFileSync } = require('fs');

const groups = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n\n');

function testOne(group) {
  const differentChoices = group.split('\n').reduce((registry, person) => {
    person.split('').forEach(answer => {
      registry[answer] = '';
    });

    return registry;
  }, {});

  return Object.keys(differentChoices).length;
}

function testTwo(group) {
  const personCount = group.split('\n').length;
  const differentChoices = group.split('\n').reduce((registry, person) => {
    person.split('').forEach(answer => {
      if (!registry[answer]) {
        registry[answer] = 0
      }
      registry[answer] += 1;
    });

    return registry;
  }, {});
  const values = Object.values(differentChoices);

  return values.filter(count => count === personCount).length;
}

const total1 = groups.reduce((acc, group) => {
  return acc + testOne(group);
}, 0);

const total2 = groups.reduce((acc, group) => {
  return acc + testTwo(group);
}, 0);

console.log(total1);
console.log(total2);
