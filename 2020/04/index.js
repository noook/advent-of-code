const { resolve } = require('path');
const { readFileSync } = require('fs');
const { cpuUsage } = require('process');

const input = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n\n');

const requiredFields = {
  byr: value => {
    const realValue = +value;
    return realValue >= 1920 && realValue <= 2002;
  },
  iyr: value => {
    const realValue = +value;
    return realValue >= 2010 && realValue <= 2020;
  },
  eyr: value => {
    const realValue = +value;
    return realValue >= 2020 && realValue <= 2030;
  },
  hgt: value => {
    const matched = value.match(/^(\d+)(in|cm)$/);
    if (null === matched) return false;
    const [, size, unit] = matched;
    if (unit === 'cm') {
      return +size >= 150 && +size <= 193;
    }
    if (unit === 'in') {
      return +size >= 59 && +size <= 76;
    }
    return false;
  },
  hcl: value => !!value.match(/^#[a-f0-9]{6}$/),
  ecl: value => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
  pid: value => !!value.match(/^\d{9}$/),
};

const passports = input.map((passport) => {
  const obj = {};
  passport.split('\n').forEach((line) => {
    line.split(' ').forEach(prop => {
      const [key, value] = prop.split(':');
      obj[key] = value;
    });
  });
  return obj;
});

const valid = passports.reduce((acc, passport) => {
  const validProps = Object.entries(passport).reduce((validCount, [prop, value]) => {
    if (requiredFields[prop]) {
      validCount += +(requiredFields[prop](value))
    }
    return validCount;
  }, 0);
  return acc + +(validProps >= 7);
}, 0);

console.log(valid);
