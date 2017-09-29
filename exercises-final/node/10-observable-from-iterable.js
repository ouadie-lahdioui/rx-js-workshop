const Rx = require('rxjs/Rx');

// This is a run-of-the mill iterable. It could be from a generator or anything
// that supports the iterable interface.
const iterable = require('./fixtures/10-iterable');

//TODO: create an observable the `data` array with `Observable.from`
const source$ = Rx.Observable.from(iterable);

console.log('start');
source$.subscribe(
  x => console.log(x),
  err => console.error(err),
  () => console.info('done')
);
console.log('stop');

/**
  NOTE: expected output
  start
  0
  1
  2
  3
  4
  5
  done
  stop
*/

// Notice the output is _synchronous_, because iterators can be pulled from
// synchronously

// NOTE: Bonus/gotcha... Strings are iterables in JavaScript. Try it out.
