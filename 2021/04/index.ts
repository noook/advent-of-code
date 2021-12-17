import { readFileSync } from 'fs';
import { resolve } from 'path';

class Case {
  public position: { x: number, y: number };
  public ticked = false;
  public value: number;

  constructor(x: number, y: number, value: number) {
    this.position = { x, y };
    this.value = value;
  }
}

class Board {
  private cases: Record<number, Case>;
  private map: Case[][] = [];

  public constructor(strRepr: string) {
    this.cases = strRepr
      .split('\n')
      .reduce((acc, line, y) => {
        const numbers = line.match(/(\d+)/g).map(Number);
        const row = [];

        numbers.forEach((num, x) => {
          const newCase = new Case(x, y, num);
          acc[num] = newCase;
          row.push(newCase);
        });
        this.map.push(row);

        return acc;
      }, {});
  }

  public tickCase(num: number) {
    if (this.cases[num]) {
      this.cases[num].ticked = true;
    }

    return this;
  }

  get won() {
    const cols: Case[][] = [];

    for (let i = 0; i < this.map[0].length; i++) {
      const col = this.map.map(row => row[i]);
      cols.push(col);
    }

    return (
      this.map.some(row => row.every(gridCase => gridCase.ticked === true))
      ||
      cols.some(col => col.every(gridCase => gridCase.ticked === true))
    );
  }

  public getScore(lastNum: number) {
    const score = Object.entries(this.cases)
      .reduce((unmarked, [num, numCase]) => {
        if (numCase.ticked === false) {
          unmarked.push(num)
        }

        return unmarked;
      }, [])
      .reduce((total, num) => total + +num, 0);

    return score * lastNum;
  }
}

function parseInput() {
  const [list, ...boardsMap] = readFileSync(resolve(__dirname, './input.txt'), 'utf-8')
    .split('\n\n');

  return {
    numbers: list.split(',').map(Number),
    boards: boardsMap.map(str => new Board(str)),
  };
}

const { numbers, boards } = parseInput();

function play() {
  for (const num of numbers) {
    for (const board of boards) {
      board.tickCase(num);

      if (board.won) {
        return board.getScore(num);
      }
    };
  }
}

function playToLose(sequence: number[], boardsList: Board[], index = 0) {
  const num = sequence[index];

  if (boardsList.length === 1) {
    return boardsList[0].tickCase(num).getScore(num);
  }

  const notWonYet = boardsList.filter(board => {
    board.tickCase(num);

    return board.won === false;
  });

  return playToLose(sequence, notWonYet, index + 1);
}

// console.log(play());
console.log(playToLose(numbers, boards));