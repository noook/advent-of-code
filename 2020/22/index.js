
const { resolve } = require('path');
const { readFileSync } = require('fs');

const decks = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n\n')
  .reduce((acc, deck, idx) => {
    acc[idx + 1] = deck.split('\n').slice(1).map(Number);
    return acc;
  }, {});


class Game {
  decks = {};
  round = 1;
  history = new Map();
  recursive = false;

  constructor(decks, recursive = false) {
    this.decks = decks;
    this.recursive = recursive;
  }

  done() {
    return !this.decks[1].length || !this.decks[2].length;
  }

  debug() {
    console.log({
      round: this.round,
      decks: this.decks,
    });
  }

  nextRound() {
    if (process.env.DEBUG) {
      this.debug();
    }

    const [a, b] = this.pickTopCards();
    const snapshot = [...this.decks[1], '|', ...this.decks[2]].join('');

    if (this.history.has(snapshot)) {
      this.decks[2] = [];
      return;
    }

    this.history.set(snapshot, true);

    const winner = a > b ? 1 : 2;

    if (this.recursive) {
      if (this.decks[1].length >= a && this.decks[2].length >= b) {
        const subgame = new Game(
          {
            1: this.decks[1].slice(0, a),
            2: this.decks[2].slice(0, b),
          },
          true
        );

        while (!subgame.done()) {
          subgame.nextRound();
        }

        const subWinner = subgame.getScore().winner;
        this.decks[subWinner].push(...(subWinner === 1 ? [a, b] : [b, a]))

      } else {
        this.decks[winner].push(Math.max(a, b), Math.min(a, b))
      }
    } else {
      this.decks[winner].push(Math.max(a, b), Math.min(a, b))
    }
    this.round++
  }

  pickTopCards() {
    return [this.decks[1].shift(), this.decks[2].shift()];
  }

  getScore() {
    const winner = this.decks[1].length ? 1 : 2;

    return {
      winner,
      score: this.decks[winner].reduce((score, card, idx, arr) => {
        return score + card * (arr.length - idx);
      }, 0)
    }
  }
}

const game = new Game(decks, true);

while (!game.done()) {
  game.nextRound();
}

console.log(game.getScore());
