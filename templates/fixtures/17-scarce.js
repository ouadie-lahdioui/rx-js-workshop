const { Observable } = require('rxjs/Rx');

let active = false;
module.exports = new Observable(observer => {
  if (!active) {
    active = true;
    return Observable.interval(100).take(20).subscribe(observer);
  } else {
    throw new Error('scarce$ is already active!');
  }
});
