/*
 * Simple Stack using array implementation
 */

class Stack {
  constructor() {
    this.storage = [];
    this.num = 0;
  }

  isEmpty() {
    return this.num === 0;
  }

  push(item) {
    // Use num to index the array, then increment num
    this.storage[this.num++] = item;
  }

  pop() {
    /*
     * This allows us to decrement the counter, then use it to index the array.
     * This implementation also removes reference to the deleted object.
     */
    let item = this.storage[--this.num];
    this.storage[this.num] = null;
    return item;
  }
}

let s = new Stack();
console.log(s.isEmpty()); // true
s.push(1);
s.push(2);
console.log(s.pop()); // 2
console.log(s.isEmpty()); // false
