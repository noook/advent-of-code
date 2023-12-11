import { describe, expect, test } from 'vitest';
import { output } from '@/utils';
import { Challenge } from '@/utils/Challenge';

interface Input {
  instructions: string[];
  nodes: Map<string, [string, string]>;
}

class Day8 extends Challenge<Input> {
  parseInput(str: string): Input {
    const [instructions, lines] = str.split('\n\n');
    const map = new Map<string, [string, string]>();

    lines.split('\n').forEach((line) => {
      const [key, value] = line.split(' = ');
      const [L, R] = value.slice(1, -1).split(', ');
      map.set(key, [L, R]);
    })
    
    return {
      instructions: instructions.split(''),
      nodes: map,
    };
  }

  public solve() {
    return this.calculateSteps('AAA', (node) => node === 'ZZZ');
  }

  private calculateSteps(startNode: string, endCondition: (node: string) => boolean) {
    let idx = 0;
    let currentStep = startNode;

    while (!endCondition(currentStep)) {
      const [L, R] = this.input.nodes.get(currentStep)!;
      const nextStep = this.input.instructions[idx % this.input.instructions.length];
      currentStep = nextStep === 'L' ? L : R;
      idx++;
    }

    return idx;
  }

  public solve2() {
    const nodes = [...this.input.nodes.keys()].filter(key => key.at(-1) === 'A');
    const steps = nodes.map(node => this.calculateSteps(node, (node) => node.endsWith('Z')));
    return this.lowestCommonMultipleForList(steps);
  }

  private lowestCommonMultipleForList(list: number[]) {
    return list
      .slice(1)
      .reduce((acc, val) => this.lowestCommonMultiple(acc, val), list[0]);
  }

  private lowestCommonMultiple(a: number, b: number) {
    return a * b / this.greatestCommonDiviser(a, b);
  }

  private greatestCommonDiviser(a: number, b: number): number {
    if (b === 0) {
      return a;
    }

    return this.greatestCommonDiviser(b, a % b);
  }
}


if (import.meta.vitest) {
  describe('Day 0', () => {
    test('Example 1', (ctx) => {
      const challenge = new Day8(__dirname, 'example.input.txt');
      const result = challenge.solve();
      output(ctx.task.name, result);
      expect(result).toEqual(6);
    })

    test('Challenge - 1', (ctx) => {
      const challenge = new Day8(__dirname, 'input.txt');
      const result = challenge.solve();
      output(ctx.task.name, result);
      expect(result).toEqual(22411);
    })

    test('Example 2', (ctx) => {
      const challenge = new Day8(__dirname, 'example.input.txt');
      const result = challenge.solve2();
      output(ctx.task.name, result);
      expect(result).toEqual(6);
    })

    test.only('Challenge - 2', (ctx) => {
      const challenge = new Day8(__dirname, 'input.txt');
      const result = challenge.solve2();
      output(ctx.task.name, result);
      expect(result).toEqual(undefined);
    })
  })
}