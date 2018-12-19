import MyArray from './index';

describe('Class MyArray', () => {
  describe('tests for method map', () => {

    test('if custom context doesn\'t provided, use current context', () => {
      const arr = new MyArray(1,4,0);
      const testArr = [];
      const user = {
        name: 'ivan',
        testForEach () {
          arr.forEach(() => testArr.push(this.name));
        }
      }
      user.testForEach()
      expect(testArr).toEqual(['ivan','ivan','ivan']);
    });

  });

  describe('tests for method pop', () => {
    let arr;

    beforeEach(() => {
      arr = new MyArray(1,4,0)
    });

    test('instance has method pop', () => {
      expect(arr.pop).toBeInstanceOf(Function);
    });

    test('instance has not Own Property pop', () => {
      expect(arr.hasOwnProperty('pop')).toBeFalsy();
    });

    test('Method must return deleted element', () => {
      expect(arr.pop()).toBe(0);
    });

    test('Method must delete last element from array', () => {
      const deleted = arr.pop();

      expect(arr[3]).toBeUndefined();
      expect(deleted).toBe(0);
    });

    test('Length of array must reduce by 1', () => {
      arr.pop();

      expect(arr.length).toBe(2);
    });

    test('must work correctly with empty array', () => {
      const arrEmpty = new MyArray();

      expect(arrEmpty.pop()).toBeUndefined();
    });

    test('Empty array length always must be 0', () => {
      const arrEmpty = new MyArray();
      const initialLength = arrEmpty.length;
      arr.pop();
      arr.pop();
      const finalLength = arrEmpty.length;

      expect(initialLength).toBe(0);
      expect(finalLength).toBe(0);

    });


  });

  describe('tests for method find', () => {
  //1
    test("returns undefined if there is no such element", () => {
      const arr = new MyArray(2,4,5);
      const callback = (x) => x > 10; 
      expect(arr.find(callback)).toBeUndefined();
    });
    
  //2  
    test('returns the first element that satisfies the criterion', () => {
      const callback = (x)=> x > 1;
      const arr = new MyArray(1, 2, 3);
      expect(arr.find(callback)).toBe(2);
    });
  
  //3
    test('callback has to be a function', () => {
      const callback = "";
      const arr = new MyArray(1, 2, 3); 
      expect(() => {arr.find(callback)}).toThrow();
      
      
    });
  
  });

});