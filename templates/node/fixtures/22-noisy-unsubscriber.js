const Rx = require('rxjs/Rx');

module.exports = function noisyUnsubscriber(name) {
  return new Rx.Observable(observer => {
    const sub = Rx.Observable.interval(200)
      .map(n => `${name}: ${n}`)
      .subscribe(observer);
    return () => {
      sub.unsubscribe();
      console.log(`${name} unsubscribed`);
    };
  });
};
