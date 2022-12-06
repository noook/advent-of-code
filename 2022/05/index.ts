import { describe, expect, test } from 'vitest';
import { zip, cloneDeep } from 'lodash-es';
import { chunk, output } from '@/utils';
import { Challenge } from '@/utils/Challenge';

interface Instruction {
  count: number;
  from: number;
  to: number;
}

class Day5 extends Challenge<{ instructions: Instruction[], crates: string[][] }> {
  static crateRegex = /(?:\[([A-Z])\]|(\s){3})(?:\s|$)/gm;
  static instructionRegex = /move\s(?<count>\d+)\sfrom\s(?<from>\d+)\sto\s(?<to>\d+)/gm;

  parseInput(str: string): { instructions: Instruction[], crates: string[][] } {
    const [cratesStr, instructions] = str.split('\n\n');
    const parsedCrates = cratesStr.split('\n').slice(0, -1).join('\n');
    const cratesIterator = parsedCrates.matchAll(Day5.crateRegex);
    const createsCount = cratesStr.split('\n').pop()?.match(/\d/g)
    const crates = chunk([...cratesIterator].map(result => result[1] ?? null), +createsCount?.pop()!);
    const matchedInstructions = [...instructions.matchAll(Day5.instructionRegex)].map(match => match.groups!);

    return {
      crates: zip(...crates).map(stack => stack.filter(item => item !== null)) as string[][],
      instructions: matchedInstructions.map(instruction => ({
        count: +instruction.count,
        from: +instruction.from,
        to: +instruction.to,
      }))
    };
  }

  public solve() {
    const copy = cloneDeep(this.input);
    copy.instructions.forEach(instruction => {
      for (let i = 0; i < instruction.count; i += 1) {
        const moved = copy.crates[instruction.from - 1].shift()!;
        copy.crates[instruction.to - 1].unshift(moved);
      }
    });
    return copy.crates.reduce((acc, stack) => acc + stack[0], '');
  }

  public solve2() {
    const copy = cloneDeep(this.input);
    copy.instructions.forEach(instruction => {
      const moved = copy.crates[instruction.from - 1].splice(0, instruction.count);
      copy.crates[instruction.to - 1].unshift(...moved);
    });
    return copy.crates.reduce((acc, stack) => acc + stack[0], '');
  }
}

if (import.meta.vitest) {
  describe('Day 5', () => {
    test('Example 1', (ctx) => {
      const challenge = new Day5(__dirname, 'example.input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      expect(result).toEqual('CMZ');
    })

    test('Example 2', (ctx) => {
      const challenge = new Day5(__dirname, 'example.input.txt');
      const result = challenge.solve2();
      output(ctx.meta.name, result);
      expect(result).toEqual('MCD');
    })

    test('Challenge - 1', (ctx) => {
      const challenge = new Day5(__dirname, 'input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      expect(result).toEqual('SHMSDGZVC');
    })

    test('Challenge - 2', (ctx) => {
      const challenge = new Day5(__dirname, 'input.txt');
      const result = challenge.solve2();
      output(ctx.meta.name, result);
      expect(result).toEqual('VRZGHDFBQ');
    })
  })
}