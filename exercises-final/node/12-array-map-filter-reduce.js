const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/** TODO:
  1. Take the odd numbers from the list,
  2. Double them (i.e. 1 -> 2, 3 -> 6, etc)
  3. Sum them
*/

const result = arr.filter(x => x % 2 === 1)
  .map(x => x + x)
  .reduce((s, x) => s + x, 0);

console.log(result);

/**
  NOTE: expected output
  50
*/
