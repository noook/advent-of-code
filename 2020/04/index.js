const { resolve } = require('path');
const { readFileSync } = require('fs');

const validators = {
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
    const [, sizeStr, unit] = matched;
    const size = +sizeStr;

    if (unit === 'cm') {
      return size >= 150 && size <= 193;
    }
    if (unit === 'in') {
      return size >= 59 && size <= 76;
    }

    return false;
  },
  hcl: value => !!value.match(/^#[a-f0-9]{6}$/),
  ecl: value => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
  pid: value => !!value.match(/^\d{9}$/),
  cid: value => false,
};

const passports = readFileSync(resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n\n')
  // Passport can be split on multiple lines. Making it a single line
  .map(passport => passport.split('\n').join(' '))
  // Format each password to make it an object
  .map(passport => passport.split(' ').reduce((acc, field) => {
    const [key, value] = field.split(':');
    acc[key] = value;

    return acc;
  }, {}));

const valid = passports.reduce((validCount, passport) => {
  const validFieldsCount = Object.entries(passport).reduce((validatedFields, [field, value]) => {
    return validatedFields + +validators[field](value);
  }, 0);

  if (validFieldsCount >= 7) {
    validCount++;
  }

  return validCount;
}, 0);

console.log(valid);
