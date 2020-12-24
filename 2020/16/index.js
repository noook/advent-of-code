const { resolve } = require('path');
const { readFileSync } = require('fs');

const [intervalsList, myTicket, nearbyTickets] = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8').split('\n\n')
const myRealTicket = myTicket.split('\n')[1].split(',').map(Number);

const intervalRegex = /(?<field>.+):\s(?<interval1>\d+-\d+)\sor\s(?<interval2>\d+-\d+)/
const intervals = intervalsList
  .split('\n')
  .map(line => {
    const { field, interval1, interval2 } = line.match(intervalRegex).groups;
    return {
      field,
      intervals: [
        interval1.split('-').map(Number),
        interval2.split('-').map(Number),
      ],
    };
  });

const possibleIntervals = intervals.reduce((acc, field) => [...acc, ...field.intervals], []);
const intervalsMap = new Map();

intervals.forEach(field => {
  field.intervals.forEach(interval => {
    if (!intervalsMap.has(field.field)) {
      intervalsMap.set(field.field, []);
    }
    intervalsMap.set(field.field, intervalsMap.get(field.field).concat([interval]));
  });
});

const tickets = nearbyTickets
  .split('\n')
  .slice(1)
  .join(',')
  .split(',')
  .map(Number);

const { result, invalid } = tickets
  .reduce((acc, ticket) => {
    if (possibleIntervals.every(([a, b]) => !(ticket >= a && ticket <= b))) {
      acc.result += ticket;
      acc.invalid.push(ticket);
    }

    return acc;
  }, { result: 0, invalid: [] });

console.log('Part 1:', result);

const remainingTickets = nearbyTickets
  .split('\n')
  .slice(1)
  .map(line => line.split(',').map(Number))
  .filter(ticket => !ticket.some(num => invalid.includes(num)));

remainingTickets.push(myRealTicket);

const ticketLength = remainingTickets[0].length;

const fields = [...intervalsMap.keys()].reduce((acc, field) => ({ ...acc, [field]: 0 }), {});

function getPossibilities(tickets) {
  const order = {};
  const candidates = [];

  for (let i = 0; i < ticketLength; i++) {
    const obj = tickets.reduce((counts, ticket) => {
      [...intervalsMap.entries()].forEach(([field, [interval1, interval2]]) => {
        if ((ticket[i] >= interval1[0] && ticket[i] <= interval1[1]) || (ticket[i] >= interval2[0] && ticket[i] <= interval2[1])) {
          counts[field]++;
        }
      }, counts);

      return counts;
    }, { ...fields });
    candidates.push(obj);
  }

  const fieldsCounts = Object.keys(fields);

  while (Object.keys(order).length !== fieldsCounts.length) {
    for (let i = 0; i < candidates.length; i += 1) {
      const valid =  Object
        .entries(candidates[i])
        .filter(([, count]) => count === remainingTickets.length)
        .map(([field]) => field);

      if (valid.length === 1) {
        debugger;
        order[i] = valid[0];
        candidates.splice(
          0,
          candidates.length,
          ...candidates.map(obj => {
            delete obj[valid[0]];
            return obj;
          })
        );

        break;
      }
    }
  }
  return Object.entries(order).sort((a, b) => a[0] - b[0]).map(([, field]) => field);
}

const order = getPossibilities(remainingTickets);
const indexes = order.reduce((acc, field, idx) => {
  if (field.includes('departure')) {
    acc.push(idx);
  }

  return acc;
}, []);

console.log('Part 2:', indexes.reduce((acc, idx) => acc * myRealTicket[idx], 1));

