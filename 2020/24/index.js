const { resolve } = require('path');
const { readFileSync } = require('fs');

const regex = /^([sn]?[ew])/;

const input = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map(line => {
    let match;
    const directions = [];

    while ((match = line.match(regex)) !== null) {
      line = line.replace(match[1], '');
      directions.push(match[1]);
    }

    return directions;
  });

class HexGrid {
  boxes = new Map();
  moves = {
    e: [1, 0],
    se: [0, 1],
    sw: [-1, 1],
    w: [-1, 0],
    nw: [0, -1],
    ne: [1, -1],
  }

  constructor() {
    this.boxes.set('0,0', 'W');
  }

  /**
   * @param {string[]} path 
   */
  findPath(path) {
    return path.reduce((coordinates, direction) => {
      const [x, y] = this.moves[direction];
      coordinates.x += x;
      coordinates.y += y;

      return coordinates;
    }, { x: 0, y: 0 })
  }

  /**
   * @param {string[]} path 
   */
  flipBox(path) {
    const { x, y } = this.findPath(path);

    const coord = `${x},${y}`;
    if (!this.boxes.has(coord)) {
      this.boxes.set(coord, 'W')
    }

    const color = this.boxes.get(coord);
    this.boxes.set(coord, color === 'W' ? 'B' : 'W');
  }

  fillWhites() {
    const fixedGrid = new Map(this.boxes);
    const iterator = fixedGrid.keys();
    let current;

    while (!(current = iterator.next()).done) {
      const [x, y] = current.value.split(',').map(Number);

      Object.values(this.moves).forEach(coords => {
        const box = `${x + coords[0]},${y + coords[1]}`;
  
        if (!this.boxes.has(box)) {
          this.boxes.set(box, 'W');
        }
      });
    }
  }

  countAdjacent({ x, y }) {
    const adjacent = Object.values(this.moves).reduce((acc, coords) => {
      const box = `${x + coords[0]},${y + coords[1]}`;
      acc[this.boxes.get(box)] += 1;

      return acc;
    }, { B: 0, W: 0 });

    return adjacent;
  }

  count(color) {
    this.fillWhites();

    const iterator = this.boxes.values();
    let current;
    let count = 0;

    while (!(current = iterator.next()).done) {
      count += +(color === current.value);
    }

    return  count;
  }

  nextDay() {
    this.fillWhites();

    const newGrid = new Map(this.boxes);
    const iterator = this.boxes.entries();
    let current;

    while (!(current = iterator.next()).done) {
      const [coords, color] = current.value
      const [x, y] = coords.split(',').map(Number);
      const adjacents = this.countAdjacent({ x, y });

      if (color === 'B' && (adjacents.B === 0 || adjacents.B > 2)) {
        newGrid.set(coords, 'W')
      }

      if (color === 'W' && adjacents.B === 2) {
        newGrid.set(coords, 'B');
      }
    }

    this.boxes = newGrid;
  }

  run(days) {
    for (let i = 0; i < days; i += 1) {
      this.nextDay();
    }
  }
}

const grid = new HexGrid();

input.forEach(tile => {
  grid.flipBox(tile);
})

grid.run(100);

console.log('Day 100:', grid.count('B'));
