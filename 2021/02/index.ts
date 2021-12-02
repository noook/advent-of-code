import { readFileSync } from 'fs';
import { resolve } from 'path';

const input = readFileSync(resolve(__dirname, './input.txt'), 'utf-8')
  .split('\n')
  .map(line => {
    return (([action, val]) => {
      return [action, +val] as InputEntry;
    })(line.split(' ') as [Action, string]);
  });

type Action = 'up' | 'forward' | 'down';

type InputEntry = [Action, number];

type ActionMap = Record<Action, (value: number) => void>;

abstract class Submarine {
  protected position: { x: number, y: number, aim: 0 } = {
    x: 0,
    y: 0,
    aim: 0,
  }

  public getResult(): number {
    return this.position.x * this.position.y;
  }
}

class Submarine1 extends Submarine implements ActionMap {
  public forward(value: number) {
    this.position.x += value;
  }
  public up(value: number) {
    this.position.y -= value;
  }
  public down(value: number) {
    this.position.y += value;
  }
}

class Submarine2 extends Submarine implements ActionMap {
  public forward(value: number) {
    this.position.x += value;
    this.position.y += this.position.aim * value;
  }

  public up(value: number) {
    this.position.aim -= value;
  }

  public down(value: number) {
    this.position.aim += value;
  }
};

const submarine1 = new Submarine1();
const submarine2 = new Submarine2();

input.forEach(line => {
  submarine1[line[0]](line[1]);
  submarine2[line[0]](line[1]);
});

console.log('Part 1:', submarine1.getResult());
console.log('Part 2:', submarine2.getResult());
