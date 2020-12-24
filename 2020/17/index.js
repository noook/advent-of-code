const { resolve } = require('path');
const { readFileSync } = require('fs');

const input = readFileSync(resolve(__dirname, 'example.txt'), 'utf-8').split('\n');