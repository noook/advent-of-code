import { describe, expect, test } from 'vitest';
import { chunk, output, sumReducer } from '@/utils';
import { Challenge } from '@/utils/Challenge';

class Day3 extends Challenge<string[]> {
  public parseInput(str: string): string[] {
    return str.split('\n');
  }

  private getPriority(char: string): number {
    return this.priorities.indexOf(char) + 1
  }

  private priorities: string[] = [
    // [a-z]
    ...Array(26).fill(undefined).map((_, idx) => String.fromCharCode(idx + 97)),
    // [A-Z]
    ...Array(26).fill(undefined).map((_, idx) => String.fromCharCode(idx + 65)),
  ]

  private getStringIntersection(groups: string[]): string {
    const sets = groups.map(group => new Set(group))
    const chars = new Set(...sets.map(set => [...set.values()]))
    const common = [...chars].find(char => sets.every(set => set.has(char)))

    if (!common) throw new Error('No common character');

    return common
  }

  private calculatePriority(groups: string[][]): number {
    const badges = groups.map(this.getStringIntersection);
    return badges.map(badge => this.getPriority(badge)).reduce(sumReducer);
  }

  public solve() {
    const groups = this.input.map(line => {
      return [line.slice(0, line.length / 2), line.slice(line.length / 2)]
    });
    return this.calculatePriority(groups)
  }

  public solve2() {
    const groups = chunk(this.input, 3);
    return this.calculatePriority(groups)
  }
}

if (import.meta.vitest) {
  describe('Day 3', () => {
    test('Example 1', (ctx) => {
      const challenge = new Day3(__dirname, 'example.input.txt');
      output(ctx.meta.name, challenge.solve());
      expect(challenge.solve()).toEqual(157);
    })

    test('Example 2', (ctx) => {
      const challenge = new Day3(__dirname, 'example.input.txt');
      output(ctx.meta.name, challenge.solve());
      expect(challenge.solve2()).toEqual(70);
    })

    test('Challenge - 1', (ctx) => {
      const challenge = new Day3(__dirname, 'input.txt');
      output(ctx.meta.name, challenge.solve());
      expect(challenge.solve()).toEqual(7446);
    })

    test('Challenge - 2', (ctx) => {
      const challenge = new Day3(__dirname, 'input.txt');
      output(ctx.meta.name, challenge.solve2());
      expect(challenge.solve2()).toEqual(2646);
    })
  })
}