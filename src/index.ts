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
}