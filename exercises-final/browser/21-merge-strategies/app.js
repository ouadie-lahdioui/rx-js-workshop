(function () {
  const drop = document.querySelector('#drop');
  const dropped = document.querySelector('#dropped');
  const completed = document.querySelector('#completed');
  const svg  = document.querySelector('svg');

  const dropClick$ = Rx.Observable.fromEvent(drop, 'click');

  /**
    TODO: part 1
    1. Use `addBall` and a merging strategy to add an animated ball to the svg element
       for each click of the `drop` button as soon as the `drop` button is clicked.
    2. Increment the value displayed in `dropped` for each ball dropped.
    3. Increment the value displayed in `completed` for each ball animation completed

    TODO: part 2
    4. Change merging strategies so only one animated ball is added at a time,
       But all requested balls complete their animation. Effectively, you'll be
       queueing up animations for each click to `drop`.

    TODO: part3
    5. Change merging strategies so only one animated ball may be added at a time,
       and subsequent requests cancel the currently animating ball.

    TODO: BONUS - Try different source other than button clicks to start your
                  Ball animations!

    NOTE: Balls can be added with the `addBall` function found in global scope.

    `addBall` API:

    addBall(svg: SVGElement): Observable<BallAnimationEvent>

      - returns an Observable that adds a bouncing SVGCircleElement to the passed
        SVGElement. The values emitted are BallAnimationEvents such that:

        interface BallAnimationEvent {
          t: number; // completion ratio between 0 and 1
          x: number; // x pixel position
          y: number; // y pixel position
        }
  */



  // our stream of drop clicks
  dropClick$
    // NOTE: can switch out these strategies..
    //.concatMap(() =>
    //.switchMap(() =>
    .mergeMap(() =>
      // return a ball animation observable where
      addBall(svg)
        // when the ball animates, emit an action
        .map((e) => ({ type: 'BALL_ANIMATE', e }))
        // it starts with a BALL_START action
        .startWith({ type: 'BALL_START' })
        // it ends with a BALL_END action
        .concat([{ type: 'BALL_END' }])
    )
    // use a scan for state management (we'll just mutate state, it's okay here)
    .scan((state, action) => {
      switch (action.type) {
        // when you get a BALL_START, increment dropped counter
        case 'BALL_START':
          state.dropped++;
          break;
        // when you get a BALL_END, increment the completed counter
        case 'BALL_END':
          state.completed++;
          break;
      }
      return state;
    }, { dropped: 0, completed: 0 }) // init scan here
    // subscribe to our state stream
    .subscribe(
      state => {
        // update the DOM from our state stream
        dropped.innerText = state.dropped;
        completed.innerText = state.completed;
      }
    );
}());
