import { readFileSync } from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';

export function output(name: string, ...args: any[]) {
  console.log(chalk.bold.green(`${name}:`), ...args)
}

export function readInput(dirname: string, file: string): string {
  return readFileSync(resolve(dirname, file), 'utf-8')
}

export function parseNumberLines(str: string): number[] {
  return str.split('\n').map(Number);
}

export const sumReducer = (acc: number, item: number) => acc + item;

export function sum(arr: number[]): number {
  return arr.reduce(sumReducer, 0);
}

export function chunk<T>(arr: T[], length: number): T[][] {
  const chunks: T[][] = [];

  for (let i = 0; i < arr.length; i += length) {
    chunks.push(arr.slice(i, i + length));
  }

  return chunks;
}

const hasProp = (obj: any, prop: keyof any) => {
  if (!obj) return false;

  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export type Coords = [number, number];

export function eachMatrix<T>(matrix: T[][], cb: (item: T, [x, y]: Coords) => void) {
  matrix.forEach((row, y) => {
    row.forEach((item, x) => {
      cb(item, [x, y]);
    })
  })
}

export function eachSurrounding<T, R>(matrix: T[][], [x, y]: Coords, eachFn: (adj: T, coords: Coords) => R) {
  callAtCoords(matrix, [x, y - 1], eachFn);
  callAtCoords(matrix, [x + 1, y - 1], eachFn);
  callAtCoords(matrix, [x + 1, y], eachFn);
  callAtCoords(matrix, [x + 1, y + 1], eachFn);
  callAtCoords(matrix, [x, y + 1], eachFn);
  callAtCoords(matrix, [x - 1, y + 1], eachFn);
  callAtCoords(matrix, [x - 1, y], eachFn);
  callAtCoords(matrix, [x - 1, y - 1], eachFn);
};

export function callAtCoords<T, R>(matrix: T[][], coords: Coords, callFn: (el: T, coords: Coords, ref: T[][]) => R) {
  const [x, y] = coords;

  if (hasProp(matrix, y) && hasProp(matrix[y], x)) {
    callFn(matrix[y][x], coords, matrix);
  }
};

export function count<T>(arr: T[], filter: (item: T) => boolean): number {
  return arr.filter(filter).length;
}