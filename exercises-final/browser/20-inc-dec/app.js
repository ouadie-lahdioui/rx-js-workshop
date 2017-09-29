
  /** NOTE: Setup */
  const inc = document.querySelector('#inc');
  const dec = document.querySelector('#dec');
  const output = document.querySelector('output');

  /** TODO:
    1. update output with incremented and decremented values
    2. start output with value zero

    NOTE: Hint `scan` is a great way to update a state
      without pushing your state to some global scope.
      If you're familiar with Redux, it's going to end up a
      little like that.

    TODO: BONUS - Add a button that increments by 10
  */

  const action$ = new Rx.BehaviorSubject(0);

  Rx.Observable.fromEvent(inc, 'click')
    .mapTo({ type: 'INCREMENT' })
    .subscribe(action$);

  Rx.Observable.fromEvent(dec, 'click')
    .mapTo({ type: 'DECREMENT' })
    .subscribe(action$);

  const state$ = action$.scan((state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      default:
        return state;
    }
  }, 0);

  state$.subscribe(s => output.innerText = s);
