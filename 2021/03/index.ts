import { readFileSync } from 'fs';
import { resolve } from 'path';

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf-8')
  .split('\n');

type Bit = '0' | '1';

type ExtractArrayItem<T> = T extends (infer U)[] ? U : never;

function findGammaEpsilon(list: string[]): { gamma: number, epsilon: number } {
  const counts = list.reduce((gamma, sequence) => {
    sequence.split('').forEach((bit: Bit, idx) => {
      gamma[idx] += +(bit === '1');
    });
    return gamma;
  }, [...Array(list[0].length).fill(0)] as number[]);

  const sequenceLength = input[0].length;
  const writeBits = (gamma: string, count: number) => gamma + (+(count > list.length / 2)).toString();
  const gammaBinary = counts.reduce(writeBits, '');
  const gamma = parseInt(gammaBinary, 2);
  const epsilon = (~gamma & (2**sequenceLength - 1));

  return { gamma, epsilon };
}

function findNumber(list: string[], final: Bit, index: number = 0): string {
  if (list.length === 1) {
    return list[0];
  }

  const count = list.reduce((total, sequence) => total + +(sequence[index] === final), 0);
  const bit: Bit = (+(count > list.length / 2)).toString() as Bit;
  const filterSequences = (bit: Bit) => <T extends typeof list>(sequence: ExtractArrayItem<T>) => sequence[index] === bit;

  if (count === list.length / 2) {
    return findNumber(list.filter(filterSequences(final)), final, index + 1);
  }

  return findNumber(list.filter(filterSequences(bit)), final, index + 1);
}

const { gamma, epsilon } = findGammaEpsilon(input);
const oxygen = findNumber(input, '1');
const co2 = findNumber(input, '0');

console.log('Part 1:', gamma * epsilon)
console.log('Part 2:', parseInt(oxygen, 2) * parseInt(co2, 2));
