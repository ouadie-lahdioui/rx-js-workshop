const { Observable } = require('rxjs/Rx');

module.exports = Observable.interval(200).take(10);
