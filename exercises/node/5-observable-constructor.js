const Rx = require('rxjs/Rx');

// TODO: create an observable with the Observable constructor that
// emits the values 1, 2, 3 and completes.
const source$; //<-- set me!

source$.subscribe(
  x => console.log(x),
  err => console.error(err),
  () => console.info('done')
);
