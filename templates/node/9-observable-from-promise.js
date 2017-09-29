const Rx = require('rxjs/Rx');

const promise = Promise.resolve('still useful!');

//TODO: create an observable the `data` array with `Observable.from`
// FINAL_START
const source$ = Rx.Observable.from(promise);
// FINAL_END

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
  stop
  still useful!
  done
*/

// Notice the output is _asynchronous_, because promises are an async value
