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
}