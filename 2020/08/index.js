const { resolve } = require('path');
const { readFileSync } = require('fs');

const list = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map(line => {
    const [action, value] = line.split(' ');
    return {
      action,
      value: parseInt(value),
    };
  });

function run (input) {
  const idx = [];
  let curr = 0;
  let acc = 0;
  let status = 'INF';

  while (!idx.includes(curr)) {
    if (curr === input.length) {
      status = 'OK';
      break;
    }

    idx.push(curr);

    switch (input[curr].action) {
      case 'nop':
        curr++;
        break;
      case 'jmp':
        curr += input[curr].value;
        break;
      case 'acc':
        acc += input[curr].value;
        curr++;
        break;
    }
  }

  return { acc, curr, idx, status };
}

let res = run(list);
console.log('res.idx.length', res.idx.length);

for (let i = res.idx.length - 1; i >= 0; i--) {
  const copy = [...list];
  const index = res.idx[i];

  // Ignore that won't change
  if (copy[index].action === 'acc') continue;

  const item = {
    action: copy[index].action === 'jmp' ? 'nop' : 'jmp',
    value: copy[index].value
  }

  copy.splice(index, 1, item);

  const altRes = run(copy);
  if (altRes.status === 'OK') {
    console.log('acc:', altRes.acc)
    console.log('i:', i)
  } else {
    // console.log(altRes)
  }
}
