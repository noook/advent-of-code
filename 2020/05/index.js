const { resolve } = require('path');
const { readFileSync } = require('fs');

const input = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n');

const seats = input
  .map(entry => {
    const row = entry.slice(0, 7).split('');
    const col = entry.slice(7).split('');

    // Both of the following line are building a binary number given the letter
    const rowPos = row.reduce((acc, pos) => acc + +(pos === 'B'), ''); // B is a 1, F is a 0
    const colPos = col.reduce((acc, pos) => acc + +(pos === 'R'), ''); // R is a 1, L is a 0

    // Convert those binaries back to decimal numbers
    return { row: parseInt(rowPos, 2), col: parseInt(colPos, 2) };
  })
  // Build a dictionary representing each row, and its occupied seats
  .reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }

    acc[seat.row].push(seat.col);

    return acc;
  }, {});

// Entries might not be sorted, sort it by key to ensure the order
const entries = Object.entries(seats).sort((a, b) => a[0] - b[0]);

const [row, occupiedSeats] = entries
  .slice(1, -1) // Remove first and last row
  .find(([, columns]) => columns.length !== 8); // Find the row where number of occupied seats is not 8

// Find the missing number in the list
let col;
for (let i = 0; i < 8; i += 1) {
  if (!occupiedSeats.includes(i)) {
    col = i;
    break;
  }
}

console.log(row * 8 + col);