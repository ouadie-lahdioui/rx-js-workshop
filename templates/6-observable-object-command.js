const Rx = require('rxjs/Rx');
const Command = require('./templates/fixtures/6-Command');

// TODO: create an observable with the Observable constructor that
// creates a new command, add a product, subscribes to it and tears it down after 3 seconds.

// WORKSHOP_START
// WORKSHOP_END
// FINAL_START
const source$ = new Rx.Observable(observer => {
  const command = new Command();
  command.addProduct('phone', value => observer.next(value));

  return () => {
    command.clear();
  }
});
// FINAL_END
const subscription = source$.subscribe(
  x => console.log(x),
  err => console.error(err),
  () => console.info('done')
);

setTimeout(() => subscription.unsubscribe(), 3000);

/**
NOTE: output should be:

Command: started ...
Command: new product added
0
1
2
3
4
Command: clear product list
Command: closed
*/
