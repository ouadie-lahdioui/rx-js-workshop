const Rx = require('rxjs/Rx');

// TODO: create an observable with the Observable constructor that
// emits the values 1, 2, 3 and completes.
// WORKSHOP_START
const source$; //<-- set me!
// WORKSHOP_END
// FINAL_START
const source$ = new Rx.Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
});
// FINAL_END

source$.subscribe(
  x => console.log(x),
  err => console.error(err),
  () => console.info('done')
);
