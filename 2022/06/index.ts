import { describe, expect, test } from 'vitest';
import { output } from '@/utils';
import { Challenge } from '@/utils/Challenge';

class Day6 extends Challenge<string> {
  parseInput(str: string): string {
    return str;
  }

  public solve(size: number) {
    for (let i = 0; i < this.input.length; i += 1) {
      const set = new Set(this.input.slice(i, i + size));
      if (set.size === size) {
        return i + size
      }
    }
  }
}

if (import.meta.vitest) {
  describe('Day 6', () => {
    test('Example 1', (ctx) => {
      const results = [
        new Day6(__dirname, 'example.input.1.txt').solve(4),
        new Day6(__dirname, 'example.input.2.txt').solve(4),
        new Day6(__dirname, 'example.input.3.txt').solve(4),
        new Day6(__dirname, 'example.input.4.txt').solve(4),
      ]
      expect(results).toEqual([7, 5, 6, 10]);
    })

    test('Example 2', (ctx) => {
      const results = [
        new Day6(__dirname, 'example.input.1.txt').solve(14),
        new Day6(__dirname, 'example.input.2.txt').solve(14),
        new Day6(__dirname, 'example.input.3.txt').solve(14),
        new Day6(__dirname, 'example.input.4.txt').solve(14),
      ]
      expect(results).toEqual([19, 23, 23, 29]);
    })

    test('Challenge - 1', (ctx) => {
      const challenge = new Day6(__dirname, 'input.txt');
      const result = challenge.solve(4);
      output(ctx.meta.name, result);
      expect(result).toEqual(1544);
    })

    test('Challenge - 2', (ctx) => {
      const challenge = new Day6(__dirname, 'input.txt');
      const result = challenge.solve(14);
      output(ctx.meta.name, result);
      expect(result).toEqual(2145);
    })
  })
}