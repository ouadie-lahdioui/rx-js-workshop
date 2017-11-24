class Command {
  
  constructor() {
    this.products = [];
  }

  addProduct(code, handler) {
    if (!code) throw new Error('invalid product code');
    this.products.push({code, handler});
    this.start();
    console.log('Command: new product added');
  }

  clear() {
    console.log(`Command: clear product list`);
    clearInterval(this._id);
    console.log('Command: closed');
  }

  start() {
    if (this.products.length === 1) {
      let i = 0;
      console.log('Command: started ...');
      this._id = setInterval(() => this.notify(i++), 500);
    }
  }

  notify(value) {
    this.products.forEach(product => product.handler(value));
  }

}

module.exports = Command;