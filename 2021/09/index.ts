import { readFileSync } from 'fs';
import { resolve } from 'path';

const parsedInput = readFileSync(resolve(__dirname, './input.txt'), 'utf-8')
  .split('\n')
  .map(line => line.split('').map(Number));

console.log(parsedInput);

const directions = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
] as const;

function isLowestAdjacent(input: number[][], x: number, y: number) {
  let lowest = 10;
  for (const [hor, vert] of directions) {
    const num = (input[y + vert] || [])[x + hor];

    if (num !== undefined && num < lowest) {
      lowest = num;
    }
  }

  return input[y][x] < lowest;
}

function biggerAdjacents(input: number[][], x: number, y: number, coordinatesMap: Record<`${number},${number}`, number> = {}) {
  for (const [hor, vert] of directions) {
    const adj = (input[y + vert] || [])[x + hor];
    if (adj !== undefined && adj > input[y][x] && adj !== 9) {
      coordinatesMap[`${x + hor},${y + vert}`] = adj;
      biggerAdjacents(input, x + hor, y + vert, coordinatesMap)
    }
  }

  return coordinatesMap;
}

function findLowPoints(input: number[][]) {
  const lowPoints: { x: number; y: number; value: number }[] = [];
  for (let y = 0; y < input.length; y += 1) {
    const line = input[y];
    
    for (let x = 0; x < line.length; x += 1) {
      if (isLowestAdjacent(input, x, y)) {
        lowPoints.push({ x, y, value: input[y][x] });
      }
    }
  }

  return lowPoints;
}

const totalRisk = (arr: ReturnType<typeof findLowPoints>) => arr.reduce((total, value) => total + value.value + 1, 0);

const lowPoints = findLowPoints(parsedInput);
console.log(totalRisk(lowPoints));

const basins = lowPoints
  .map(point => biggerAdjacents(parsedInput, point.x, point.y))
  .map(basin => Object.keys(basin).length + 1);

const biggest = basins.sort((a, b) => b - a).slice(0, 3);
console.log(biggest.reduce((total, value) => total * value, 1));
