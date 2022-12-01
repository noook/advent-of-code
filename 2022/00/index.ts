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
      output(ctx.meta.name, challenge.solve());
      expect(challenge.solve()).toEqual(/* Replace expected value */ undefined);
    })

    test('Example 2', (ctx) => {
      const challenge = new Day0(__dirname, 'example.input.txt');
      output(ctx.meta.name, challenge.solve());
      expect(challenge.solve()).toEqual(/* Replace expected value */ undefined);
    })

    test('Challenge - 1', (ctx) => {
      const challenge = new Day0(__dirname, 'input.txt');
      // We can't predict the result, so we output it
      output(ctx.meta.name, challenge.solve());
    })

    test('Challenge - 2', (ctx) => {
      const challenge = new Day0(__dirname, 'input.txt');
      // We can't predict the result, so we output it
      output(ctx.meta.name, challenge.solve());
    })
  })
}