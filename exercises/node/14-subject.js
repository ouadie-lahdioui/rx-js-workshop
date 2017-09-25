const Rx = require('rxjs/Rx');
const createLoggingObserver = require('./helpers/createLoggingObserver');

const observerA = createLoggingObserver('A');
const observerB = createLoggingObserver('B');

// TODO: Create and subscribe to a subject with `observerA` and `observerB`
// TODO: synchronously notify the subject with values 1, 2, 3 via `next` and `complete`
// TODO: Try nexting after complete.
// TODO: Try the same thing with `subject.error()` instead of complete


/**
  NOTE: expected output
  A 1
  B 1
  A 2
  B 2
  A 3
  B 3
  A done
  B done
*/
