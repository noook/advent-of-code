import { describe, expect, test } from 'vitest';
import { count, output, sum } from '@/utils';
import { Challenge } from '@/utils/Challenge';

type Card = [number[], number[]];

class Day4 extends Challenge<Card[]> {
  parseInput(str: string): Card[] {
    return str
      .split('\n')
      .map(line => line.split(': ')[1])
      .map(line => line.replaceAll('  ', ' '))
      .map(line => line.split(' | '))
      .map(sides => sides.map(side => side.split(' ').map(Number))) as Card[];
  }

  public solve() {
    const points = this.input.map(([winners, picked]) => {
      const won = count(picked, num => winners.includes(num))
      return won === 0 ? 0 : 2 ** (won - 1)
    }, 0)

    return sum(points)
  }

  public solve2() {
    const cardCounts = this.input.map(() => 1)

    this.input.forEach(([winners, picked], idx) => {
      const won = count(picked, num => winners.includes(num))

      for (let i = idx + 1; i <= idx + won; i += 1) {
        cardCounts[i] += cardCounts[idx]
      }
    })

    return sum(cardCounts);
  }
}

if (import.meta.vitest) {
  describe('Day 0', () => {
    test('Example 1', (ctx) => {
      const challenge = new Day4(__dirname, 'example.input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      expect(result).toEqual(13);
    })

    test('Challenge - 1', (ctx) => {
      const challenge = new Day4(__dirname, 'input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      expect(result).toEqual(25183);
    })

    test('Example 2', (ctx) => {
      const challenge = new Day4(__dirname, 'example.input.txt');
      const result = challenge.solve2();
      output(ctx.meta.name, result);
      expect(result).toEqual(30);
    })

    test('Challenge - 2', (ctx) => {
      const challenge = new Day4(__dirname, 'input.txt');
      const result = challenge.solve2();
      output(ctx.meta.name, result);
      // Only for refactoring purpose: enter the value you found and test your code still works
      // expect(result).toEqual(/* Replace expected value */);
    })
  })
}