import { describe, expect, test } from 'vitest';
import { output } from '@/utils';
import { Challenge } from '@/utils/Challenge';

interface Range {
  start: number;
  end: number;
}

class Day4 extends Challenge<[Range, Range][]> {
  parseInput(str: string): [Range, Range][] {
    return str
      .split('\n')
      .map(line => line.split(','))
      .map(pairs => {
        return pairs.map(pair => {
          const [start, end] = pair.split('-').map(Number);
          return { start, end }
        })
      }) as [Range, Range][]
  }

  public solve(overlap: boolean) {
    const output = this.input.reduce((count, pair) => {
      const [a, b] = pair;
      if (overlap) {
        if (a.start <= b.start && a.end >= b.end) {
          count += 1;
        } else if (b.start <= a.start && b.end >= a.end) {
          count += 1;
        }
      } else {
        if (a.start <= b.start && b.start <= a.end) {
          count += 1;
        } else if (b.start <= a.start && a.start <= b.end) {
          count += 1;
        }
      }

      return count;
    }, 0);
    return output;
  }
}

if (import.meta.vitest) {
  describe('Day 0', () => {
    test('Example 1', (ctx) => {
      const challenge = new Day4(__dirname, 'example.input.txt');
      const result = challenge.solve(true);
      output(ctx.meta.name, result);
      expect(result).toEqual(2);
    })

    test('Example 2', (ctx) => {
      const challenge = new Day4(__dirname, 'example.input.txt');
      const result = challenge.solve(false);
      output(ctx.meta.name, result);
      expect(result).toEqual(4);
    })

    test('Challenge - 1', (ctx) => {
      const challenge = new Day4(__dirname, 'input.txt');
      const result = challenge.solve(true);
      output(ctx.meta.name, result);
      expect(result).toEqual(602);
    })

    test('Challenge - 2', (ctx) => {
      const challenge = new Day4(__dirname, 'input.txt');
      const result = challenge.solve(false);
      output(ctx.meta.name, result);
      expect(result).toEqual(891);
    })
  })
}