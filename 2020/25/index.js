const { resolve } = require('path');
const { readFileSync } = require('fs');

const [cardKey, doorKey] = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map(Number);

class EncryptionKey {
  // Fixed
  publicKey;
  remainder;

  // Variable
  subject;
  value = 1;
  loopSize = 0;

  constructor(publicKey, remainder) {
    this.publicKey = publicKey;
    this.remainder = remainder;
  }

  bruteforce() {
    let i = 1;
    let found = false;

    while(!found) {
      this.subject = i;
      this.value = 1;
      this.loopSize = 0;

    
      for (let j = 0; j < 10_000_000; j += 1) {
        if (this.publicKey !== this.value) {
          this.loop();
        } else {
          found = true;
          break;
        }
      }
    
      if (found) {
        return;
      }

      i++;
    }
  }

  loop() {
    this.value = (this.value * this.subject) % this.remainder;
    this.loopSize++;
  }

  /**
   * 
   * @param {EncryptionKey} key1 
   * @param {EncryptionKey} key2 
   */
  solveEncryptionKey(key1, key2) {
    this.subject = key1.publicKey;

    for (let i = 0; i < key2.loopSize; i +=1 ) {
      this.loop();
    }

    return this.value;
  }
}

const card = new EncryptionKey(cardKey, 20201227);
const door = new EncryptionKey(doorKey, 20201227);

card.bruteforce();
door.bruteforce();

console.log(card, door);

const handshake = new EncryptionKey(null, 20201227);
handshake.solveEncryptionKey(card, door);

console.log('Part 1:', handshake.value);
