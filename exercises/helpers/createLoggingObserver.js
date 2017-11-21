module.exports = function createLoggingObserver (name) {
  return {
    next(x) { console.log(name, x); },
    error(err) { console.error(name, error); },
    complete() { console.info(name, 'done'); }
  }
}
