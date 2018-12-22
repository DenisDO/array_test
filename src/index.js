function MyArray(...args) {
  this.length = arguments.length;

  for (let i = 0; i < args.length; i++) {
    this[i] = args[i];
  }
}

MyArray.prototype.toString = function() {
  let result = String;

  for (let i = 0; i < this.length; i++) {
    result += this[i];
  }

  return result;
};

MyArray.prototype.push = function(...args) {
  for (let i = 0; i < arguments.length; i++) {
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
  this.length = this.length - 1;
  return value;
};

MyArray.prototype.forEach = function(callback, thisArg) {
  let self = null;

  if (thisArg) {
    self = thisArg;
  }

  for (let i = 0; i < this.length; i++) {
    callback.call(self, this[i], i, this);
  }
};

MyArray.prototype.reduce = function(callback, currentValue) {
  let acc = null;
  let i = null;

  if (this.length === 0 && !currentValue) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  if (this.length === 1 && !currentValue) {
    return this[0];
  }

  if (this.length === 0 && currentValue) {
    return currentValue;
  }

  if (currentValue) {
    acc = currentValue;
    i = 0;
  } else {
    acc = this[0];
    i = 1;
  }

  for (; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }

  return acc;
};

MyArray.prototype.map = function(callback, thisArg) {
  const resultArray = new MyArray();

  let self = null;

  if (thisArg) {
    self = thisArg;
  }

  for (let i = 0; i < this.length; i++) {
    const newElement = callback.call(self, this[i], i, this);
    resultArray[i] = newElement;
    resultArray.length += 1;
  }

  return resultArray;
};

MyArray.prototype.filter = function(callback, thisArg) {
  const resultArray = new MyArray();

  let self = null;

  if (thisArg) {
    self = thisArg;
  }

  for (let i = 0; i < this.length; i++) {
    if (callback.call(self, this[i], i, this)) {
      resultArray.push(this[i]);
    }
  }

  return resultArray;
};

MyArray.prototype.sort = function(callback) {
  if (!callback) {
    for (let i = 1; i < this.length; i++) {
      const current = this[i];
      let j = i;

      while (j > 0 && String(this[j - 1]) > String(current)) {
        this[j] = this[j - 1];
        j -= 1;
      }

      this[j] = current;
    }
  } else {
    for (let i = 0; i < this.length - 1; i++) {
      for (let j = 0; j < this.length - 1; j++) {
        if (callback(this[j], this[j + 1]) >= 0) {
          const max = this[j];
          this[j] = this[j + 1];
          this[j + 1] = max;
        }
      }
    }
  }

  return this;
};

MyArray.from = function(...args) {
  const resultArray = new MyArray();
  let callback = null;
  let self = null;

  if (args[2]) {
    self = args[2];
  }

  if (args[1]) {
    callback = args[1];

    for (let i = 0; i < args[0].length; i++) {
      resultArray[i] = callback.call(self, args[0][i], i, args[0]);
      resultArray.length += 1;
    }
  } else {
    for (let i = 0; i < args[0].length; i++) {
      resultArray[i] = args[0][i];
      resultArray.length += 1;
    }
  }

  return resultArray;
};

export default MyArray;
