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
    // If the regex doesn't match, it is false.
    // Prevents the script from crashing on the next line when trying to destruct non interable value `null`
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
  // The two following regex should be length aware to prevent character noise before or after the match.
  // Can be explicitly set by matching the beginning and of the line with ^ and $ tokens.
  hcl: value => !!value.match(/^#[a-f0-9]{6}$/),
  pid: value => !!value.match(/^\d{9}$/),
  ecl: value => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
  cid: value => false, // Don't count cid in the valid fields count
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
    // Here we reach the field validator through the mapper defined over
    return validatedFields + +validators[field](value);
  }, 0);

  if (validFieldsCount >= 7) {
    validCount++;
  }

  return validCount;
}, 0);

console.log(valid);
