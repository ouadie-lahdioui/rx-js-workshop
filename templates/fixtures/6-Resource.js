class Resource {
  constructor() {
    this._handlers = { data: [] };
  }

  start() {
    if (!this._active) {
      this._active = true;
      let i = 0;
      console.log('Resource: started');
      this._id = setInterval(() => this._notify('data', i++), 500)
    }
  }

  _notify(name, value) {
    if (name !== 'data') throw new Error(`invalid event name ${name}`);
    this._handlers.data.forEach(handler => handler(value));
  }

  addEventListener(name, handler) {
    if (name !== 'data') throw new Error(`invalid event name ${name}`);
    this._handlers.data.push(handler);
    this.start();
    console.log('Resource: event listener added');
  }

  removeEventListener(name, handler) {
    if (name !== 'data') throw new Error(`invalid event name ${name}`);
    const { data } = this._handlers;
    const i = data.indexOf(handler);
    if (i !== -1) {
      data.splice(i, 1);
      console.log('Resource: event listener removed');
    }

    if (data.length === 0) {
      this.close();
    }
  }

  close() {
    this._active = false;
    clearInterval(this._id);
    console.log('Resource: closed');
  }
}

module.exports = Resource;
