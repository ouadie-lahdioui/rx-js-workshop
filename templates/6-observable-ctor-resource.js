const Rx = require('rxjs/Rx');
const Resource = require('./fixtures/6-Resource');

// TODO: create an observable with the Observable constructor that
// creates a new resource, subscribes to it's "data" event, and tears it
// down when it's done.

/**
NOTE: `Resource` usage:

const resource = new Resource(); // start the resource;

const handler = value => observer.next(value);

resource.addEventListener('data', handler); // listen for data events
resource.removeEventListener('data', handler); // stop listening for data events
*/

// WORKSHOP_START
const source$; // <-- set me!
// WORKSHOP_END
// FINAL_START
const source$ = new Rx.Observable(observer => {
  const resource = new Resource();
  const handler = value => observer.next(value);
  resource.addEventListener('data', handler);

  return () => {
    resource.removeEventListener('data', handler);
  }
});
// FINAL_END
const subscription = source$.subscribe(
  x => console.log(x),
  err => console.error(err),
  () => console.info('done')
);

setTimeout(() => subscription.unsubscribe(), 2100);

/**
NOTE: output should be:

Resource: started
Resource: event listener added
0
1
2
3
Resource: event listener removed
Resource: closed
*/
