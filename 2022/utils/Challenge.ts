import { readInput } from ".";

export abstract class Challenge<Input> {
  public input: Input;

  constructor(dir: string, file: string) {
    this.input = this.parseInput(readInput(dir, file));
  }

  public abstract parseInput(str: string): Input;

  public abstract solve(...options: any): any;
}