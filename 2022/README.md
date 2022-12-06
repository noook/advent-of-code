# Advent of Code 2022

## Installation

```sh
npm i
```

## Running a day

Simply run the following command, and it will run tests on the file that was saved.

```sh
npm run dev
```


You can copy the structure of the [Day 0](./00/) to complete the challenges.

Each challenge has at least 2 methods to be implemented:

```ts
type InputType = number[];

class DayN extends Challenge<InputType> {
  /**
   * Transform your input so you can work with it after
   */
  parseInput(str: string): InputType {
    return str.split('\n').map(Number);
  }

  /**
   * Implement your solution here. You can pass additional parameters to your function
   */
  public solve(param: any) {
    // Your answer here
  }
}

// Testing your solution
if (import.meta.vitest) {
  describe('Day N', () => {
    // Each day consists of 2 parts
    test('Example 1', (ctx) => {
      // Copy the example input and paste it into the `example.input.txt` file.
      const challenge = new Day1(__dirname, 'example.input.txt');
      output(ctx.meta.name, challenge.solve());
      // Assert that your solution returns the expected value. The example's answer is provided by the exercice
      expect(challenge.solve()).toEqual(24000);
    });

    test('Example 2', (ctx) => {
      const challenge = new Day1(__dirname, 'example.input.txt');
      output(ctx.meta.name, challenge.solve());
      expect(challenge.solve(3)).toEqual(45000);
    });

    test('Challenge - 1', (ctx) => {
      const challenge = new Day1(__dirname, 'input.txt');
      // You can't know your answer so instead of making assertions you just output the answer you found
      output(ctx.meta.name, challenge.solve());
    });

    test('Challenge - 2', (ctx) => {
      const challenge = new Day1(__dirname, 'input.txt');
      // Usually the second part requires to update your function, and it may take additional parameters
      output(ctx.meta.name, challenge.solve(3));
    });
  });
}
```

Example of testing output:
```
stdout | 01/index.ts > Day 1 > Example 1
Example 1: 24000

stdout | 01/index.ts > Day 1 > Example 2
Example 2: 24000

stdout | 01/index.ts > Day 1 > Challenge - 1
Challenge - 1: 69528 # Submit this value on adventofcode.com

stdout | 01/index.ts > Day 1 > Challenge - 2
Challenge - 2: 206152 # Submit this value on adventofcode.com

 ✓ 01/index.ts (4)
   ✓ Day 1 (4)
     ✓ Example 1
     ✓ Example 2
     ✓ Challenge - 1
     ✓ Challenge - 2

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Start at  11:13:29
   Duration  646ms (transform 269ms, setup 0ms, collect 62ms, tests 7ms)


 PASS  Waiting for file changes...
       press h to show help, press q to quit
```