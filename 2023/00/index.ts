import { describe, expect, test } from 'vitest';
import { output } from '@/utils';
import { Challenge } from '@/utils/Challenge';

class Day0 extends Challenge<string> {
  parseInput(str: string): string {
    return str;
  }

  public solve() {
    // Your answer here
  }
}

if (import.meta.vitest) {
  describe('Day 0', () => {
    test('Example 1', (ctx) => {
      const challenge = new Day0(__dirname, 'example.input.txt');
      const result = challenge.solve();
      output(ctx.task.name, result);
      expect(result).toEqual(undefined);
    })

    test.skip('Challenge - 1', (ctx) => {
      const challenge = new Day0(__dirname, 'input.txt');
      const result = challenge.solve();
      output(ctx.task.name, result);
      expect(result).toEqual(undefined);
    })

    test.skip('Example 2', (ctx) => {
      const challenge = new Day0(__dirname, 'example.input.txt');
      const result = challenge.solve();
      output(ctx.task.name, result);
      expect(result).toEqual(undefined);
    })

    test.skip('Challenge - 2', (ctx) => {
      const challenge = new Day0(__dirname, 'input.txt');
      const result = challenge.solve();
      output(ctx.task.name, result);
      expect(result).toEqual(undefined);
    })
  })
}