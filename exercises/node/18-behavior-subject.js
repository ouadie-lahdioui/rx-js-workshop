const Rx = require('rxjs/Rx');
const { meatspaceSystem, temp$ } = require('./fixtures/18-meatspace');

/**
  NOTE: setup

  `temp$`             - An observable stream of temperature changes that arrive
                        once every 2 seconds
  `meatspaceSystem`   - A simulation of users randomly viewing the stream of
                        temperature data. (Not actually random, just simulated)

                        When the callback provided to `meatspaceSystem` is called
                        it is given user object with a `sendTemperature` method
                        and an `onleave` event hook for you to fill out.

                        the `user` object itself writes to console.

  NOTE: All timing is virtualized, so you don't have to wait forever for the
        demo code to run.
*/

/** TODO:
  1. Notify all incoming users of the latest temperature.
  2. Be sure the users don't have to wait for the first value.
*/

meatspaceSystem((user) => {
  // TODO: notify users with `user.sendTemperature(temp)`

  // `user.onleave` is called when the user stop watching values
  user.onleave = () => {
    // TODO: stop sending temps to the user when they leave
  }
});

/**
  NOTE: expected output

  1000ms (user 1): JOIN
  1000ms (user 1): 67.0°C
  2000ms (user 1): 67.2°C
  4000ms (user 1): 67.3°C
  6000ms (user 2): JOIN
  6000ms (user 2): 67.3°C
  6000ms (user 1): 67.4°C
  6000ms (user 2): 67.4°C
  8000ms (user 1): LEAVING
  8000ms (user 2): 67.6°C
  9000ms (user 3): JOIN
  9000ms (user 3): 67.6°C
  10000ms (user 2): 67.9°C
  10000ms (user 3): 67.9°C
  12000ms (user 2): LEAVING
  12000ms (user 3): 68.0°C
  13000ms (user 3): LEAVING
*/
