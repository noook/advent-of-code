import { describe, expect, test } from 'vitest';
import { output } from '@/utils';
import { Challenge } from '@/utils/Challenge';

class Day6 extends Challenge<[number[], number[]]> {
  parseInput(str: string): [number[], number[]] {
    return str.split('\n')
    .map(line => line.split(':')[1])
    .map(line => line.trim().replace(/\s+/g, ' '))
    .map(line => line.split(' ').map(Number)) as [number[], number[]];
  }

  public solve() {
    const [time, distance] = this.input;
    let result = 1;

    for (let i = 0; i < time.length; i += 1) {
      const t = time[i];
      const d = distance[i];
      result *= this.findWinnable(t, d);
    }

    return result
  }

  public solve2() {
    const [time, distance] = this.input;
    return this.findWinnable(+time.join(''), +distance.join(''))
  }

  /**
   * Quadratic formula performance:
   * - example 1: 0.077ms
   * - challenge 1: 0.009ms
   * - example 2: 0.023ms
   * - challenge 2: 0.006ms
   */
  private solveQuadratic(a: number, b: number, c: number) {
    const delta = b ** 2 - 4 * a * c;
    const deltaRoot = Math.floor(Math.sqrt(delta));
    const x1 = (-b + deltaRoot) / (2 * a);
    const x2 = (-b - deltaRoot) / (2 * a);
    return [x1, x2]
  }

  private findWinnable(time: number, distance: number): number {
    return this.bruteforceMethod(time, distance)
    const [x1, x2] = this.solveQuadratic(1, -time, distance)
    const inclusive = x1 * (time - x1) === distance
    return Math.floor(x1) - Math.ceil(x2) + (inclusive ? -1 : 1)
  }

  /**
   * Brute force method performance:
   * - example 1: 0.071ms
   * - challenge 1: 0.15ms
   * - example 2: 0.959ms
   * - challenge 2: 39.976ms
   */
  private bruteforceMethod(time: number, distance: number): number {
    let ways = 0;
    for (let speed = 1; speed < time; speed += 1) {
      const ran = (time - speed) * speed;

      if (ran > distance) {
        ways += 1
      }
    }

    return ways;
  }
}

if (import.meta.vitest) {
  describe('Day 0', () => {
    test('Example 1', (ctx) => {
      const challenge = new Day6(__dirname, 'example.input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      expect(result).toEqual(288);
    })

    test('Challenge - 1', (ctx) => {
      const challenge = new Day6(__dirname, 'input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      expect(result).toEqual(1083852);
    })

    test('Example 2', (ctx) => {
      const challenge = new Day6(__dirname, 'example.input.txt');
      const result = challenge.solve2();
      output(ctx.meta.name, result);
      expect(result).toEqual(71503);
    })

    test('Challenge - 2', (ctx) => {
      const challenge = new Day6(__dirname, 'input.txt');
      const result = challenge.solve2();
      output(ctx.meta.name, result);
      expect(result).toEqual(23501589);
    })
  })
}