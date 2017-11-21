const Rx = require('rxjs/Rx');
const createLoggingObserver = require('./helpers/createLoggingObserver');

const observerA = createLoggingObserver('A');
const observerB = createLoggingObserver('B');

const subject = new Rx.Subject();

const subA = subject.subscribe(observerA);
const subB = subject.subscribe(observerB);

subject.next(1);
subject.next(2);
// FINAL_START
subA.unsubscribe();
// FINAL_END
subject.next(3);
subject.next(4);
// FINAL_START
subB.unsubscribe();
// FINAL_END
subject.next(5);
subject.complete();

// TODO: Add code to unsubscribe observerA after the first two values
// TODO: Add code to unsubscribe observerB after the first four values

/**
  NOTE: expected output
  A 1
  B 1
  A 2
  B 2
  B 3
  B 4
*/

// NOTE: this `unsubscribe` is really just removing the observer from the
// subject's internal list of observers.
// TODO: Bonus... try calling unsubscribe on the Subject itself in a few places!
