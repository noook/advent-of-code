import { describe, expect, test } from 'vitest';
import { Coords, eachMatrix, eachSurrounding, output, sum } from '@/utils';
import { Challenge } from '@/utils/Challenge';

type Matrix<T> = T[][];

class Day4 extends Challenge<Matrix<string>> {
  parseInput(str: string): Matrix<string> {
    return str.split('\n').map(line => line.split(''));
  }

  private isDigit = (char: string) => /\d/.test(char);
  private isSymbol = (char: string) => /[^\.\d]/.test(char);
  private isGear = (char: string) => char === '*';

  private extractPartNumber<T extends string>(matrix: Matrix<T>, [x, y]: Coords) {
    let number = '';
    let pos = x;
  
    while (this.isDigit(matrix[y][pos])) {
      pos -= 1;
    }
  
    // pos will end up one too small
    pos += 1;
  
    while (this.isDigit(matrix[y][pos])) {
      number += matrix[y][pos];
      matrix[y][pos] = 'X' as T;
      pos += 1;
    }
  
    return Number(number);
  };

  public solve() {
    const parts: number[] = [];

    eachMatrix(this.input, (char, coords) => {
      if (this.isSymbol(char)) {
        eachSurrounding(this.input, coords, (adj, adjCoords) => {
          if (this.isDigit(adj)) {
            parts.push(this.extractPartNumber(this.input, adjCoords));
          }
        })
      }
    })

    return sum(parts)
  }

  public solve2() {
    const ratios: number[] = [];

    eachMatrix(this.input, (char, coords) => {
      if (this.isGear(char)) {
        const parts: number[] = [];
        eachSurrounding(this.input, coords, (adj, adjCoords) => {
          if (this.isDigit(adj)) {
            parts.push(this.extractPartNumber(this.input, adjCoords));
          }
        })

        if (parts.length === 2) {
          console.log(parts[0], parts[1])
          ratios.push(parts[0] * parts[1])
        }
      }
    })

    return sum(ratios)
  }
}

if (import.meta.vitest) {
  describe('Day 3', () => {
    test('Example 1', (ctx) => {
      const challenge = new Day4(__dirname, 'example.input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      expect(result).toEqual(4361);
    })

    test('Challenge - 1', (ctx) => {
      const challenge = new Day4(__dirname, 'input.txt');
      const result = challenge.solve();
      output(ctx.meta.name, result);
      expect(result).toEqual(528799);
    })

    test('Example 2', (ctx) => {
      const challenge = new Day4(__dirname, 'example.input.txt');
      const result = challenge.solve2();
      output(ctx.meta.name, result);
      expect(result).toEqual(467835);
    })

    test('Challenge - 2', (ctx) => {
      const challenge = new Day4(__dirname, 'input.txt');
      const result = challenge.solve2();
      output(ctx.meta.name, result);
      expect(result).toEqual(84907174);
    })
  })
}