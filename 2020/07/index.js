const { resolve } = require('path');
const { readFileSync } = require('fs');

const input = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n');

const containerRegex = /(?<name>.+\s.+)\sbags?/
const itemRegex = /(?<quantity>\d+)\s(?<name>.+\s.+)\sbags?/;

let colors = input.reduce((dict, line) => {
  const [container, items] = line.split(' contain ');
  dict[container.match(containerRegex).groups.name] = items.replace('.', '').split(', ').reduce((acc, item) => {
    try {
      acc.push((({ quantity, name }) => ({ quantity: +quantity, name }))(item.match(itemRegex).groups));
    } catch (e) {}

    return acc;
  }, []);

  return dict;
}, {});

const colorsKeys = Object.keys(colors);

function hasColor(colorName) {
  const direct = colorsKeys.filter(color => colors[color].some(item => item.name === colorName));

  const done = direct.reduce((dict, color) => ({
    ...dict,
    [color]: true,
    ...hasColor(color),
  }), {});

  return done;
}

function findCapacity(color) {
  const children = colors[color];

  if (!children.length) return 0;

  const bagages = children.reduce((total, child) => {
    total += child.quantity + findCapacity(child.name) * child.quantity;

    return total;
  }, 0);

  return bagages;
}

console.log(Object.keys(hasColor('shiny gold')).length, 'different bags can hold the shiny gold bag');
console.log('The shiny gold bag holds', findCapacity('shiny gold'), 'bags');  
