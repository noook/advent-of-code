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