import { describe, expect, test } from 'vitest';
import { output } from '@/utils';
import { Challenge } from '@/utils/Challenge';

interface Game {
  id: number;
  rounds: Round[];
}

type Round = Record<Color, number>;

type Color = 'red' | 'green' | 'blue';

class Day2 extends Challenge<Game[]> {
  parseInput(str: string): Game[] {
    return str.split('\n').map(line => {
      const gameId = /Game (?<id>\d+):/.exec(line)?.groups?.id;
      const sequences = line.split(': ')[1]
        .split('; ')
        .map(sequence => sequence.split(', '));

      return {
        id: +gameId!,
        rounds: sequences.map(sequence => {
          return sequence.reduce((acc, item) => {
            const [amount, color] = item.split(' ');
            acc[color as Color] = +amount;
            return acc;
          }, { red: 0, green: 0, blue: 0 } satisfies Round)
        })
      }
    })
  }

  private getRoundValuePart1(game: Game): number {
    const limits = {
      red: 12,
      green: 13,
      blue: 14,
    }

    const isImpossible = game.rounds.some(round => {
      if (round.red > limits.red) return true;
      if (round.green > limits.green) return true;
      if (round.blue > limits.blue) return true;

      return false;
    })

    if (isImpossible) {
      return 0;
    }

    return +game.id;
  }

  private getRoundValuePart2(game: Game): number {
    const mins: Round = game.rounds.reduce((acc, round) => {
      (['red', 'green', 'blue'] as const).forEach(color => {
        acc[color] = Math.max(acc[color], round[color]);
      })
      return acc;
    }, { red: 0, green: 0, blue: 0 } satisfies Round);

    return mins.red * mins.green * mins.blue;
  }

  public solve(part2 = false) {
    let total = 0;

    const getRoundValue = part2 ? this.getRoundValuePart2 : this.getRoundValuePart1;

    for (let i = 0; i < this.input.length; i++) {
      const game = this.input[i];
      total += getRoundValue(game);
    }
    
    return total;
  }
}

if (import.meta.vitest) {
  describe('Day 0', () => {
    test('Example 1', (ctx) => {
      const challenge = new Day2(__dirname, 'example.input.txt');
      const result = challenge.solve();
      output(ctx.task.name, result);
      expect(result).toEqual(8);
    })

    test('Challenge - 1', (ctx) => {
      const challenge = new Day2(__dirname, 'input.txt');
      const result = challenge.solve();
      output(ctx.task.name, result);
      expect(result).toEqual(2563);
    })

    test('Example 2', (ctx) => {
      const challenge = new Day2(__dirname, 'example.input.txt');
      const result = challenge.solve(true);
      output(ctx.task.name, result);
      expect(result).toEqual(2286);
    })

    test('Challenge - 2', (ctx) => {
      const challenge = new Day2(__dirname, 'input.txt');
      const result = challenge.solve(true);
      output(ctx.task.name, result);
      expect(result).toEqual(70768);
    })
  })
}