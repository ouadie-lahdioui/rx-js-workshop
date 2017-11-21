// `data$` is an observable stream of 10 numbers.
const data$ = require('./fixtures/1-data.js');

// TODO: create an observer to subscribe to `data$` and log out all values.
// FINAL_START
const observer = {
  next(x) { console.log(x) },
  error(err) { console.error(err) },
  complete() { console.info('done'); }
};

// Subscribe using observer
data$.subscribe(observer);
// FINAL_END
