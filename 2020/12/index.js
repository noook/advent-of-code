const { resolve } = require('path');
const { readFileSync } = require('fs');

let input = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map((el) => ({
    direction: el[0],
    value: +el.substr(1),
  }));

console.log(input);

const poles = ['N', 'E', 'S', 'W'];

const moves1 = {
  S(ship, value) {
    ship.y += value;
  },
  N(ship, value) {
    ship.y -= value;
  },
  E(ship, value) {
    ship.x += value;
  },
  W(ship, value) {
    ship.x -= value;
  },
  F(ship, value) {
    this[ship.direction](ship, value);
  },
  L(ship, value) {
    const turns = value / 90;
    const index = poles.findIndex(dir => dir === ship.direction);
    ship.direction = poles[(poles.length + index - turns) % poles.length];
  },
  R(ship, value) {
    const turns = value / 90;
    const index = poles.findIndex(dir => dir === ship.direction);
    ship.direction = poles[(index + turns) % poles.length];
  },
};

const moves2 = {
  N(ship, value) {
    ship.waypoint.y += value;
  },
  E(ship, value) {
    ship.waypoint.x += value;
  },
  S(ship, value) {
    ship.waypoint.y -= value;
  },
  W(ship, value) {
    ship.waypoint.x -= value;
  },
  F(ship, value) {
    ship.position.y += ship.waypoint.y * value;
    ship.position.x += ship.waypoint.x * value;
  },
  L(ship, value) {
    const turns = value / 90;
    for (let i = 0; i < turns; i += 1) {
      const copy = { ...ship.waypoint };
      ship.waypoint.x = copy.y * -1;
      ship.waypoint.y = copy.x;
    }
  },
  R(ship, value) {
    const turns = value / 90;
    for (let i = 0; i < turns; i += 1) {
      const copy = { ...ship.waypoint };
      ship.waypoint.x = copy.y;
      ship.waypoint.y = copy.x * -1;
    }
  },
}

let boat = {
  x: 0,
  y: 0,
  direction: 'E',
};

const boat2 = {
  position: {
    x: 0,
    y: 0,
  },
  waypoint: {
    x: 10,
    y: 1,
  },
};

for (const step of input) {
  moves1[step.direction](boat, step.value)
  moves2[step.direction](boat2, step.value);
}

console.log('Part 1:', Math.abs(boat.x) + Math.abs(boat.y));
console.log('Part 2:', Math.abs(boat2.position.x) + Math.abs(boat2.position.y));