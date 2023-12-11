import { describe, expect, test } from 'vitest';
import { output, sum } from '@/utils';
import { Challenge } from '@/utils/Challenge';

type From = 'start' | 'end';

class Day9 extends Challenge<number[][]> {
  parseInput(str: string): number[][] {
    return str.split('\n').map(line => line.split(' ').map(Number));
  }

  public solve(from: From) {
    const results = this.input.map(line => this.findNextNumber([line], from))
    return sum(results)
  }

  private findNextNumber(history: number[][], from: From): number {
    const last = history.at(-1)!;

    const [, ...next] = last.map((num, i) => {
      if (i === 0) return num;
      return num - last[i - 1];
    })
    history.push(next);

    if (next.every(num => num === 0)) {
      return this.treeReverse(history, from);
    }

    return this.findNextNumber(history, from)
  }

  private treeReverse(history: number[][], from: From): number {
    const idx = from === 'end' ? -1 : 0;
    const last = history.pop()!;
    if (last.every(num => num === 0)) {
      last.push(0);
    }

    const upper = history.at(-1)!;
    if (!upper) {
      return last.at(idx)!
    }

    if (from === 'end') {
      upper.push(upper.at(idx)! + last.at(idx)!);
    } else {
      upper.unshift(upper.at(idx)! - last.at(idx)!);
    }

    return this.treeReverse(history, from);
  }
}

if (import.meta.vitest) {
  describe('Day 0', () => {
    test('Example 1', (ctx) => {
      const challenge = new Day9(__dirname, 'example.input.txt');
      const result = challenge.solve('end');
      output(ctx.task.name, result);
      expect(result).toEqual(114);
    })

    test('Challenge - 1', (ctx) => {
      const challenge = new Day9(__dirname, 'input.txt');
      const result = challenge.solve('end');
      output(ctx.task.name, result);
      expect(result).toEqual(1702218515);
    })

    test('Example 2', (ctx) => {
      const challenge = new Day9(__dirname, 'example.input.txt');
      const result = challenge.solve('start');
      output(ctx.task.name, result);
      expect(result).toEqual(2);
    })

    test('Challenge - 2', (ctx) => {
      const challenge = new Day9(__dirname, 'input.txt');
      const result = challenge.solve('start');
      output(ctx.task.name, result);
      expect(result).toEqual(925);
    })
  })
}