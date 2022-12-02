import { describe, expect, test } from 'vitest';
import { output } from '@/utils';
import { Challenge } from '@/utils/Challenge';

type AnswerA = 'A' | 'B' | 'C';
type AnswerB = 'X' | 'Y' | 'Z';
type Answer = 'rock' | 'paper' | 'scissor'

class Day2 extends Challenge<[AnswerA, AnswerB][]> {
  parseInput(str: string): [AnswerA, AnswerB][] {
    return str.split('\n').map(line => line.split(' ') as [AnswerA, AnswerB]);
  }

  private opponentMap: Record<AnswerA, Answer> = {
    A: 'rock',
    B: 'paper',
    C: 'scissor',
  };

  private options: Answer[] = ['rock', 'paper', 'scissor'];
  private getScore(option: Answer): number {
    return this.options.indexOf(option) + 1
  }
  private getWinOption(option: Answer) {
    return this.options.at((this.options.indexOf(option) + 1) % this.options.length)!;
  }
  private getLoseOption(option: Answer) {
    return this.options.at(this.options.indexOf(option) - 1)!;
  }

  public solve() {
    const output = this.input.reduce((score, round) => {
      const [opponent, choice] = round;
      const playerChoices: Record<AnswerB, Answer> = {
        X: 'rock',
        Y: 'paper',
        Z: 'scissor'
      };
      const opponentAnswer = this.opponentMap[opponent];
      const choiceAnswer = playerChoices[choice];

      switch (true) {
        // Draw
        case opponentAnswer === choiceAnswer:
          return score + 3 + this.getScore(choiceAnswer)
        // Win
        case this.getWinOption(opponentAnswer) === choiceAnswer:
          return score + 6 + this.getScore(choiceAnswer)
        // Lose
        case this.getLoseOption(opponentAnswer) === choiceAnswer:
          return score + this.getScore(choiceAnswer);
      }

      return score;
    }, 0)

    return output;
  }
  public solve2() {
    const output = this.input.reduce((score, round) => {
      const [opponent, strat] = round;
      const opponentAnswer = this.opponentMap[opponent];
      switch (strat) {
        case 'X': // Lose
          return score + this.getScore(this.getLoseOption(opponentAnswer))
        case 'Y': // Draw
          return score + 3 + this.getScore(opponentAnswer);
        case 'Z': // Win
          return score + 6 + this.getScore(this.getWinOption(opponentAnswer))
      }
    }, 0)

    return output;
  }
}


if (import.meta.vitest) {
  describe('Day 2', () => {
    test('Example 1', (ctx) => {
      const challenge = new Day2(__dirname, 'example.input.txt');
      output(ctx.meta.name, challenge.solve());
      expect(challenge.solve()).toEqual(15);
    });

    test('Example 2', (ctx) => {
      const challenge = new Day2(__dirname, 'example.input.txt');
      output(ctx.meta.name, challenge.solve2());
      expect(challenge.solve2()).toEqual(12);
    });

    test('Challenge - 1', (ctx) => {
      const challenge = new Day2(__dirname, 'input.txt');
      output(ctx.meta.name, challenge.solve());
      expect(challenge.solve()).toEqual(13809);
    });

    test('Challenge - 2', (ctx) => {
      const challenge = new Day2(__dirname, 'input.txt');
      output(ctx.meta.name, challenge.solve2());
      expect(challenge.solve2()).toEqual(12316);
    });
  });
}