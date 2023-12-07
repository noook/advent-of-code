import { describe, expect, test } from 'vitest';
import { output } from '@/utils';
import { Challenge } from '@/utils/Challenge';

type Input = [
  hand: string,
  bid: number,
]

class Day0 extends Challenge<Input[]> {
  parseInput(str: string): Input[] {
    return str
      .split('\n')
      .map(line => {
        const [hand, bid] = line.split(' ');
        return [hand, +bid] as Input;
      });
  }

  private getPoints(hand: string, jokers: boolean) {
    const values = {
      card: 1,
      pair: 2,
      twoPairs: 3,
      threeOfAKind: 4,
      fullHouse: 5,
      fourOfAKind: 6,
      fiveOfAKind: 7,
    }

    const cards = hand.split('')
    const cardTypes = new Map<string, number>();

    cards.forEach(card => {
      const count = cardTypes.get(card) ?? 0;
      cardTypes.set(card, count + 1);
    })
    
    const jokersCount = jokers ? cardTypes.get('J') ?? 0 : 0;

    if (cardTypes.size === 1) {
      return values.fiveOfAKind;
    }

    if (cardTypes.size === 2) {
      const counts = Array.from(cardTypes.values());
      if (counts.includes(4)) {
        if (jokersCount > 0) {
          return values.fiveOfAKind;
        }
        return values.fourOfAKind;
      }
      if (counts.includes(3)) {
        if (jokersCount >= 2) {
          return values.fiveOfAKind;
        }
        return values.fullHouse;
      }
    }

    if (cardTypes.size === 3) {
      const counts = Array.from(cardTypes.values());
      if (counts.includes(3)) {
        if (jokersCount >= 1) {
          return values.fourOfAKind;
        }
        return values.threeOfAKind;
      }
      if (counts.includes(2)) {
        if (jokersCount > 1) {
          return values.fourOfAKind;
        }
        if (jokersCount === 1) {
          return values.fullHouse;
        }
        return values.twoPairs;
      }
    }

    if (cardTypes.size === 4) {
      if (jokersCount > 0) {
        return values.threeOfAKind;
      }
      return values.pair;
    }

    if (jokersCount === 1) {
      return values.pair;
    }

    return values.card;
  }
  
  private sortByPoints(hands: Input[], jokers: boolean) {
    const handToValue = hands.reduce((acc, [hand]) => {
      acc.set(hand, this.getPoints(hand, jokers));
      return acc
    }, new Map<string, number>());

    return hands.sort((a, b) => {
      const pointsA = handToValue.get(a[0]) ?? 0;
      const pointsB = handToValue.get(b[0]) ?? 0;

      if (pointsA === pointsB) {
        for (let i = 0; i < 5; i += 1) {
          const aCard = this.toValue(a[0][i], jokers);
          const bCard = this.toValue(b[0][i], jokers);
          if (aCard > bCard) {
            return 1;
          }
          if (aCard < bCard) {
            return -1;
          }
        }
      }

      return pointsA - pointsB;
    })
  }

  private toValue(card: string, jokers: boolean) {
    return {
      'A': 14,
      'K': 13,
      'Q': 12,
      'J': jokers ? 1 : 11,
      'T': 10,
    }[card] ?? +card;
  }

  public solve(jokers = false) {
    const sorted = this.sortByPoints(this.input, jokers);
    const points = sorted.reduce((acc, [, bid], idx) => {
      return acc + (idx + 1) * bid;
    }, 0)

    return points
  }
}

if (import.meta.vitest) {
  describe('Day 0', () => {
    test('Example 1', (ctx) => {
      const challenge = new Day0(__dirname, 'example.input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      expect(result).toEqual(6440);
    })

    test('Challenge - 1', (ctx) => {
      const challenge = new Day0(__dirname, 'input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      expect(result).toEqual(241344943);
    })

    test('Example 2', (ctx) => {
      const challenge = new Day0(__dirname, 'example.input.txt');
      const result = challenge.solve(true);
      output(ctx.meta.name, result);
      expect(result).toEqual(5905);
    })

    test('Challenge - 2', (ctx) => {
      const challenge = new Day0(__dirname, 'input.txt');
      const result = challenge.solve(true);
      output(ctx.meta.name, result);
      expect(result).toEqual(243101568);
    })
  })
}