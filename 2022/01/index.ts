import { describe, expect, test } from 'vitest';
import { output, sum, sumReducer } from '@/utils';
import { Challenge } from '@/utils/Challenge';

class Day1 extends Challenge<number[][]> {
  parseInput(str: string): number[][] {
    return str
      .split('\n\n')
      .map(line => line.split('\n').map(Number));
  }

  public solve(top = 1) {
    const result = this.input
      .reduce((acc, group) => {
        acc.push(sum(group));
        return acc;
      }, [])
      .sort((a, b) => a - b)
      .slice(-(top))
      .reduce(sumReducer, 0);

    return result;
  }
}

if (import.meta.vitest) {
  describe('Day 1', () => {
    test('Example 1', (ctx) => {
      const challenge = new Day1(__dirname, 'example.input.txt');
      output(ctx.meta.name, challenge.solve());
      expect(challenge.solve()).toEqual(24000);
    })

    test('Example 2', (ctx) => {
      const challenge = new Day1(__dirname, 'example.input.txt');
      output(ctx.meta.name, challenge.solve());
      expect(challenge.solve(3)).toEqual(45000);
    })

    test('Challenge - 1', (ctx) => {
      const challenge = new Day1(__dirname, 'input.txt');
      output(ctx.meta.name, challenge.solve());
    })

    test('Challenge - 2', (ctx) => {
      const challenge = new Day1(__dirname, 'input.txt');
      output(ctx.meta.name, challenge.solve(3));
    })
  })
}