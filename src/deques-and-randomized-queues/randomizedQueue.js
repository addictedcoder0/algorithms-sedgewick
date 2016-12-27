/*
 * Adapted from Algorithms, 4th Edition by Robert Sedgewick
 *
 * RANDOMIZED QUEUE
 * A randomized queue is similar to a stack or queue, except that the item
 * removed is chosen uniformly at random from items in the data structure.
 * Create a generic data type RandomizedQueue that implements the following
 * API:
 *
 * class RandomizedQueue {
 *   constructor()        // constructs an empty randomized queue
 *   isEmpty() bool       // is the queue empty?
 *   size() int           // return the number of items
 *   enqueue(item)        // add an item
 *   dequeue() Item       // remove and return a random item
 *   sample() Item        // return (but do not remove) a random item
 *   iterate()            // iterates through the items in random order
 * }
 *
 * The order of the two or more iterators to the same randomized queue must be
 * mutually independent; each iterator must maintain its own random order. Do
 * not allow the client to add a null item or to sample or dequeue an item from
 * an empty queue. All operations must be in constant amortized time.
 *
 * http://coursera.cs.princeton.edu/algs4/assignments/queues.html
 */

class RandomizedQueue {
  constructor() {
    this.storage = [];
    this.num = 0;
  }

  isEmpty() {
    return this.num === 0;
  }

  size() {
    return this.num;
  }

  enqueue(item) {
    if (item === null) { return 'Operation (add item: null) not allowed!'; }

    // Store the item at the N'th position, then increment N
    this.storage[this.num++] = item;
  }

  dequeue() {
    if (this.isEmpty()) { return null; }

    let rnd = Math.floor(Math.random() * (this.num));

    if (rnd !== this.num - 1) {
      /*
       * If the element is not the last element in the array, we need to swap
       * it with the last element to maintain constant time deletion.
       */
      [this.storage[rnd], this.storage[this.num - 1]]
        = [this.storage[this.num - 1], this.storage[rnd]];
    }

    this.num--;
    return this.storage.pop();
  }

  sample() {
    let rnd = Math.floor(Math.random() * (this.num));
    return this.storage[rnd];
  }

  iterate() {
    /*
     * Iterate through the queue in random order by initially making a copy
     * of the queue, randomly selecting an element in the queue, swapping it
     * with the last element, and then popping it out of the copied queue. This
     * uses native JavaScript array methods, but can be created without it.
     */
    let copy = this.storage;

    while (copy.length !== 0) {
      let rnd = Math.floor(Math.random() * copy.length);

      if (rnd !== copy.length - 1) {
        [copy[rnd], copy[copy.length - 1]]
          = [copy[copy.length - 1], copy[rnd]];
      }

      console.log(copy.pop());
    }
  }
}

if (!module.parent) {
  let rq = new RandomizedQueue();
  rq.enqueue(1);
  rq.enqueue(2);
  rq.enqueue(3);
  rq.enqueue(4);
  console.log(rq.sample());
  console.log(rq.dequeue());
  console.log(rq.size()); // 3
  rq.iterate();
}

module.exports = {
  RandomizedQueue: RandomizedQueue,
};
