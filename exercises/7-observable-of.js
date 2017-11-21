const Rx = require('rxjs/Rx');

//TODO: create an observable of 'foo', 'bar' and 'baz' with `Observable.of`


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
  foo
  bar
  baz
  done
  stop
*/

// Notice the output is _synchronous_!!
