import { readFileSync } from 'fs';
import { resolve } from 'path';

const parsedInput = readFileSync(resolve(__dirname, './input.txt'), 'utf-8')
  .split('\n')
  .map(line => line.split('').map(Number));

const directions = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
] as const;

function findSmallestAdjacents(map: typeof parsedInput, x: number, y: number, history: string[] = []) {
  const adjacents: { value: number; x: number; y: number}[] = [];
  let lowest = 10;

  for (const [hor, vert] of directions) {
    const adj = (map[y + vert] || [])[x + hor];
    if (adj !== undefined && !history.includes(`${x+hor},${y+vert}`)) {
      if (adj < lowest) {
        lowest = adj;
      }
      adjacents.push({
        value: adj,
        x: x + hor,
        y: y + vert,
      });
    }
  }

  return adjacents.filter(({ value }) => value === lowest);
}

function findPath(map: typeof parsedInput, x: number, y: number, history: string[] = []) {
  const adjacents = findSmallestAdjacents(map, x, y, history);

  return adjacents.map(adj => {
    const next = [adj.x, adj.y].join(',');

    if (adj.x === map[0].length && adj.y === map.length) {
      return [history, next];
    }
    return findPath(map, adj.x, adj.y, [...history, next]);
  });
}

const path = findPath(parsedInput, 0, 0);
console.log(path);
