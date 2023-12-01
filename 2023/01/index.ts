import { describe, expect, test } from 'vitest';
import { output } from '@/utils';
import { Challenge } from '@/utils/Challenge';

class Day1 extends Challenge<string> {
  parseInput(str: string): string {
    return str;
  }

  private digitMatch: Record<string, string> = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  }

  public solve(withLetters = false) {
    const lettersMatch = Object.keys(this.digitMatch).join('|');
    const groupMatch = withLetters ? `${lettersMatch}|\\d` : '\\d'
    const regex = new RegExp(`(?=(${groupMatch})).*(${groupMatch})`)

    const sum = this.input.split('\n').reduce((acc, line) => {
      const matches = [...line.match(regex)!]
      const [first, last] = [matches!.at(1)!, matches!.at(-1)!]
      const [digit1, digit2] = [this.digitMatch[first] ?? first, this.digitMatch[last] ?? last]

      return acc + +(digit1 + digit2)
    }, 0);

    return sum;
  }
}

if (import.meta.vitest) {
  describe('Day 0', () => {
    test('Example 1', (ctx) => {
      const challenge = new Day1(__dirname, 'example.input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      expect(result).toEqual(142);
    })

    test('Challenge - 1', (ctx) => {
      const challenge = new Day1(__dirname, 'input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      // Only for refactoring purpose: enter the value you found and test your code still works
      expect(result).toEqual(55029);
    })

    test('Example 2', (ctx) => {
      const challenge = new Day1(__dirname, 'example.input2.txt');
      const result = challenge.solve(true);
      output(ctx.meta.name, result);
      expect(result).toEqual(281);
    })

    test('Challenge - 2', (ctx) => {
      const challenge = new Day1(__dirname, 'input.txt');
      const result = challenge.solve(true);
      output(ctx.meta.name, result);
      expect(result).toEqual(55686);
    })
  })
}