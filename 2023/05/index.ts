import { describe, expect, test } from 'vitest';
import { output } from '@/utils';
import { Challenge } from '@/utils/Challenge';

class Day5 extends Challenge<string> {
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
      const challenge = new Day5(__dirname, 'example.input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      expect(result).toEqual(/* Replace expected value */ undefined);
    })

    test.skip('Challenge - 1', (ctx) => {
      const challenge = new Day5(__dirname, 'input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      // Only for refactoring purpose: enter the value you found and test your code still works
      // expect(result).toEqual(/* Replace expected value */);
    })

    test.skip('Example 2', (ctx) => {
      const challenge = new Day5(__dirname, 'example.input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      // expect(result).toEqual(/* Replace expected value */);
    })

    test.skip('Challenge - 2', (ctx) => {
      const challenge = new Day5(__dirname, 'input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      // Only for refactoring purpose: enter the value you found and test your code still works
      // expect(result).toEqual(/* Replace expected value */);
    })
  })
}