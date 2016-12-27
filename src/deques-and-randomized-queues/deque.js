/*
 * Adapted from Algorithms, 4th Edition by Robert Sedgewick
 *
 * DEQUE
 * A double-ended queue or `deque` (pronounced 'deck') is a generalization of a
 * stack and a queue that supports adding and removing items from either the
 * front or the back of the data structure. Create a generic data type Deque
 * that implements the following API:
 *
 * class Deque {
 *   constructor()        // constructs an empty deque
 *   isEmpty() bool       // is the deque empty?
 *   size() int           // return the number of items
 *   addFirst(item)       // add an item to the front
 *   addLast(item)        // add an item to the end
 *   removeFirst() Item   // remove and return the item from the front
 *   removeLast() Item    // remove and return the item from the end
 *   iterate()            // iterates through the items from front to end
 * }
 *
 * Do not allow clients to add a null item or remove items from an empty deque.
 * Each deque operation must be performed in constant worst-case time, and use
 * space proportional to the number of items currently in the deque.
 *
 * http://coursera.cs.princeton.edu/algs4/assignments/queues.html
 */

class Node {
  constructor(val) {
    this.value = val;
    this.prev = null;
    this.next = null;
  }
}

class Deque {
  constructor() {
    this.num = 0;
    this.first = null;
    this.last = null;
  }

  isEmpty() {
    return this.num === 0;
  }

  size() {
    return this.num;
  }

  addFirst(item) {
    if (item === null) { return 'Operation (add item: null) not allowed!'; }

    let newNode = new Node(item);

    if (this.isEmpty()) {
      this.first = newNode;
      this.last = newNode;
    } else {
      let old = this.first;
      this.first = newNode;
      this.first.next = old;
      old.prev = this.first;
    }

    this.num++;
  }

  addLast(item) {
    if (item === null) { return 'Operation (add item: null) not allowed!'; }

    let newNode = new Node(item);

    if (this.isEmpty()) {
      this.first = newNode;
      this.last = newNode;
    } else {
      let old = this.last;
      this.last = newNode;
      this.last.prev = old;
      old.next = this.last;
    }

    this.num++;
  }

  removeFirst() {
    if (this.isEmpty()) { return null; }

    let item = this.first.value;

    if (this.size() === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = this.first.next;
      this.first.prev = null;
    }

    this.num--;
    return item;
  }

  removeLast() {
    if (this.isEmpty()) { return null; }

    let item = this.last.value;

    if (this.size() === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.last = this.last.prev;
      this.last.next = null;
    }

    this.num--;
    return item;
  }

  iterate() {
    let x = this.first;

    while (x) {
      console.log(x.value);
      x = x.next;
    }
  }
}

let d = new Deque();
d.addFirst(5);
d.addFirst(10);
d.addLast(13);
console.log(d.removeFirst()); // 10
console.log(d.size()); // 2
d.addLast(27);
console.log(d.removeLast()); // 27
d.addFirst(9);
d.addFirst(30);
d.addLast(12);
d.iterate(); // 30, 9, 5, 13, 12
