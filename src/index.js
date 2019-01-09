function MyArray(...args) {
  if (args.length === 1 && typeof args[0] === 'number') {
    this.length = args[0];
  } else {
    this.length = args.length;

    for (let i = 0; i < args.length; i++) {
      this[i] = args[i];
    }
  }
}

MyArray.prototype.toString = function() {
  let result = this.length === 0 ? '' : this[0];

  for (let i = 1; i < this.length; i++) {
    result += `,${this[i]}`;
  }

  return result;
};

MyArray.prototype.push = function(...args) {
  for (let i = 0; i < args.length; i++) {
    this[this.length] = args[i];
    this.length += 1;
  }

  return this.length;
};

MyArray.prototype.pop = function() {
  if (this.length === 0) {
    return;
  }

  const value = this[this.length - 1];
  delete this[this.length - 1];
  this.length -= 1;
  return value;
};

MyArray.prototype.forEach = function(callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    callback.call(thisArg, this[i], i, this);
  }
};

MyArray.prototype.reduce = function(callback, currentValue) {
  let acc = currentValue === undefined ? this[0] : currentValue;

  if (this.length === 0 && !currentValue) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  if (this.length === 0 && currentValue) {
    return currentValue;
  }

  if (currentValue !== undefined) {
    acc = callback(currentValue, this[0], 0, this);
  }


  for (let i = 1; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }

  return acc;
};

MyArray.prototype.map = function(callback, thisArg) {
  const resultArray = new MyArray();

  for (let i = 0; i < this.length; i++) {
    resultArray[i] = callback.call(thisArg, this[i], i, this);
    resultArray.length += 1;
  }

  return resultArray;
};

MyArray.prototype.filter = function(callback, thisArg) {
  const resultArray = new MyArray();

  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      resultArray.push(this[i]);
    }
  }

  return resultArray;
};

MyArray.prototype.sort = function(callback) {
  const cb = callback ? callback : (a, b) => `${a}` > `${b}`;

  for (let i = 0; i < this.length; i++) {
    const swapElem = this[i];
    let lastValue = i - 1;

    while (lastValue >= 0 && cb(this[lastValue], swapElem) > 0) {
      this[lastValue + 1] = this[lastValue];
      lastValue -= 1;
    }
    this[lastValue + 1] = swapElem;
  }

  return this;
};

MyArray.prototype[Symbol.iterator] = function() {
  let index = 0;
  const self = this;

  return {
    next() {
      while (index < self.length) {
        index += 1;
        return {
          value: self[index - 1],
          done: false
        };
      }
      return {
        done: true
      };
    }
  };
};

MyArray.from = function(...args) {
  const resultArray = new MyArray();
  let callback = null;

  if (args[1]) {
    callback = args[1];

    for (let i = 0; i < args[0].length; i++) {
      resultArray.push(callback.call(args[2], args[0][i], i, args[0]));
    }
  } else {
    for (let i = 0; i < args[0].length; i++) {
      resultArray.push(args[0][i]);
    }
  }

  return resultArray;
};

MyArray.prototype.slice = function(begin, end) {
  const resultArray = new MyArray();

  const start = begin < 0 ? this.length + begin : begin || 0;
  const finish = end < 0 ? this.length + end : end || this.length;

  for (let i = start; i < finish; i++) {
    resultArray.push(this[i]);
  }

  return resultArray;
};

MyArray.prototype.find = function(callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      return this[i];
    }
  }
};

export default MyArray;
