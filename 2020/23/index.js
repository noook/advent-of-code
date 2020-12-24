class CrabGame {
  cups = {};
  cupsCount = 0
  current = null;

  constructor(input, cupsCount = input.length) {
    this.cupsCount = cupsCount;
    let lastInsert;

    input.split('').forEach((cup, idx, cups) => {
      this.cups[cup] = +cups[idx + 1];
      lastInsert = cup;
    }); 
    
    for (let i = input.length; i < this.cupsCount; i += 1) {
      this.cups[input[i - 1] ?? i] = i + 1;
      lastInsert = i + 1;
    }

    this.cups[lastInsert] = +input[0];

    this.current = +input[0];
  }

  run(rounds) {
    for (let i = 0; i < rounds; i++) {
      this.next();
    }
  }

  pickCups() {
    const keys = [];
    let index = this.current;

    for (let i = 0; i < 3; i += 1) {
      const next = this.cups[index];
      delete this.cups[index];
      keys.push(next);
      index = next
      this.cups[this.current] = this.cups[next];
    }

    return keys;
  }

  next() {
    const picked = this.pickCups();
    let destination;

    for (let i = this.current - 1;; i--) {
      if (picked.includes(i)) continue;

      if (i < 1) {
        i = this.cupsCount + 1;
        continue;
      }

      destination = i;
      break;
    }

    this.insert(picked, destination);
    this.current = this.cups[this.current];
  }

  insert(keys, destination) {
    const chainEnd = this.cups[destination];
    let index = destination;

    for (let i = 0; i < keys.length; i += 1) {
      this.cups[index] = keys[i];
      index = keys[i];
    }

    this.cups[index] = chainEnd;
  }

  output(v2 = false) {
    if (v2) {
      const first = this.cups[1];
      const second = this.cups[first];

      return first * second;
    }

    let output = '';
    let index = 1;

    while (this.cups[index] !== 1) {
      const next = this.cups[index];
      output += next;
      index = next;
    }

    return output;
  }
}

const game = new CrabGame('198753462', 1_000_000);
game.run(10_000_000);

console.log(game.output(true));
