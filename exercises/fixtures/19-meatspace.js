const Rx = require('rxjs/Rx');

const { Observable } = Rx;

const virtualScheduler = new Rx.VirtualTimeScheduler();

const temp$ = Observable.timer(0, 500, virtualScheduler)
  .zip(
    [
      67.0, 67.2, 67.3, 67.4, 67.6, 67.9, 68.0, 68.1,
      67.0, 67.2, 67.3, 67.4, 67.6, 67.9, 68.0, 68.1,
      67.0, 67.2, 67.3, 67.4, 67.6, 67.9, 68.0, 68.1,
      67.0, 67.2, 67.3, 67.4, 67.6, 67.9, 68.0, 68.1,
    ],
    (_, t) => t
  )
  .multicast(new Rx.Subject());

temp$.connect();

let userId = 1;

class User {
  constructor(listenDuration) {
    this.id = userId++;
    this.log('JOIN');
    Observable.timer(listenDuration, virtualScheduler)
      .subscribe(() => this.leave());
  }

  sendTemperature(temp) {
    this.log(temp.toFixed(1) + '°C');
  }

  leave() {
    this.log('LEAVING');
    if (this.onleave) {
      this.onleave();
    }
  }

  log(msg) {
    const { id } = this;
    const frame = virtualScheduler.now();
    console.log(`${frame}ms (user ${id}): ${msg}`)
  }
}

function meatspaceSystem(callback) {
  Observable.merge(
    Observable.timer(1100, virtualScheduler).map(() => new User(2900)),
    Observable.timer(1600, virtualScheduler).map(() => new User(5100)),
    Observable.timer(3700, virtualScheduler).map(() => new User(4700))
  )
  .subscribe(
    user => callback(user)
  );

  virtualScheduler.flush();
}

module.exports = {
  temp$,
  meatspaceSystem
};
