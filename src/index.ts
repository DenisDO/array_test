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
}