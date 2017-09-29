const { Observable } = require('rxjs/Rx');

module.exports = Observable.interval(50).take(10);
