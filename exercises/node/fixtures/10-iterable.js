module.exports = {
  _i: 0,

  next() {
    if (this._i > 5) {
      return { done: true };
    } else {
      return { done: false, value: this._i++ };
    }
  },

  [Symbol.iterator]() { return this; }
};;
