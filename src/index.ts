class MyArray<T> {

  length: number;
  [key: number]: T;

  constructor(...args: T[] | number[]) {
    if (args.length === 1 && typeof args[0] === 'number') {
      this.length = args[0] as number;
    } else {
      this.length = args.length;
  
      for (let i = 0; i < args.length; i++) {
        this[i] = args[i] as T;
      }
    }
  }

  toString(): string {
    let result = this.length === 0 ? '' : `${this[0]}`;
  
    for (let i = 1; i < this.length; i++) {
      result += `,${this[i]}`;
    }
  
    return result;
  }

  push(...args: T[]): number {
    for (let i = 0; i < args.length; i++) {
      this[this.length] = args[i];
      this.length += 1;
    }
  
    return this.length;
  }

  pop(): T {
    if (this.length === 0) {
      return;
    }
  
    const value = this[this.length - 1];
    delete this[this.length - 1];
    this.length -= 1;
    return value;
  }

  forEach(callback: (currentValue?: T, index?: number, array?: MyArray<T>) => void, thisArg?: any): void {
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  }

  reduce(callback: (accumulator?: T, currentValue?: T, index?: number, array?: MyArray<T>) => T, currentValue: T): T {
    if (this.length === 0 && !currentValue) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
  
    if (this.length === 0 && currentValue) {
      return currentValue;
    }
  
    let accumulator = currentValue === undefined ? this[0] : currentValue;
  
    if (currentValue !== undefined) {
      accumulator = callback(currentValue, this[0], 0, this);
    }
  
    for (let index = 1; index < this.length; index++) {
      accumulator = callback(accumulator, this[index], index, this);
    }
  
    return accumulator;
  }

  map<R>(callback: (currentValue?: T, index?: number, array?: MyArray<T>) => R, thisArg?: any): MyArray<R> {
    const resultArray = new MyArray<R>();
  
    for (let i = 0; i < this.length; i++) {
      resultArray[i] = callback.call(thisArg, this[i], i, this);
      resultArray.length += 1;
    }
  
    return resultArray;
  }

  filter(callback: (currentValue?: T, index?: number, array?: MyArray<T>) => any, thisArg?: any): MyArray<T> {
    const resultArray = new MyArray<T>();
  
    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        resultArray[resultArray.length] = this[i];
        resultArray.length += 1;
      }
    }
  
    return resultArray;
  }

  sort(callback?: (a: T, b: T) => number): MyArray<T> {
    const cb = callback ? callback : (a: T, b: T) => `${a}` > `${b}`;
  
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
  }

  slice(begin?: number, end?: number): MyArray<T> {
    const resultArray = new MyArray<T>();
  
    const start = begin < 0 ? this.length + begin : begin || 0;
    const finish = end < 0 ? this.length + end : end || this.length;
  
    for (let i = start; i < finish; i++) {
      resultArray[resultArray.length] = this[i];
      resultArray.length += 1;
    }
  
    return resultArray;
  }

  find(callback: (element?: T, index?: number, array?: MyArray<T>) => boolean, thisArg?: any): T | undefined {
    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        return this[i];
      }
    }
  }
}