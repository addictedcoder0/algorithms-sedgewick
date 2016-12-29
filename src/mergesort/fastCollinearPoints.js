/*
 * Adapted from Algorithms, 4th Edition by Robert Sedgewick
 *
 * FAST COLLINEAR POINTS
 *
 * It is possible to solve the problem much faster than the brute-force
 * solution. Given a point p, the following method determines whether p
 * participates in a set of 4 or more collinear points.
 *   - Think of p as the origin
 *   - For each other point q, determine the slope it makes with p
 *   - Sort the points according to the slopes they make with p
 *   - Check if any 3 (or more) adjacent points in the sorted order have equal
 *     slopes with respect to p. If so, these points, together with p, are
 *     collinear.
 *
 * Applying this method for each of the n points in turn yields an efficient
 * algorithm to the problem. The algorithm solves the problem because points
 * that have equal slopes with respect to p are collinear, and sorting brings
 * such points together. The algorithm is fast because the bottleneck operation
 * is sorting.
 *
 * Write a program FastCollinearPoints that implements this algorithm:
 *
 * class FastCollinearPoints {
 *   fast(points)         // finds all the line segments containing 4+ points
 *   numberOfSegments()   // number of line segments
 *   printLineSegments()  // prints all the line segments
 * }
 *
 * The method segments() should include each maximal line segment containing 4
 * (or more) points exactly once. For example, if 5 points appear on a line
 * segment in the order p->q->r->s->t, then do not include the subsegments p->s
 * or q->t.
 *
 * Performance requirements: the growth of the running time of your program
 * should be n^2 log n in the worst case and it should use space proportional
 * to n plus the number of line segments returned. FastCollinearPoints should
 * work properly even if the input has 5 or more collinear points.
 *
 * http://coursera.cs.princeton.edu/algs4/assignments/collinear.html
 */

let fs;

if (typeof(document) === 'undefined') {
  Point = require('./Point').Point;
  LineSegment = require('./LineSegment').LineSegment;
  fs = require('fs');
  mergesort = require('./mergesort').mergesort;
}

class FastCollinearPoints {
  constructor(data) {
    this.points       = [];
    this.lineSegments = [];
    this.number       = 0;

    // Clean the data to allow reading of x and y coordinates
    data.split('\n').forEach((line, lineNum) => {
      if (lineNum !== 0 && line !== '') {
        let points = line.split(' ');
        points     = points.filter((data) => {
          return data !== '';
        });

        // Create a new point instance for each line of data
        let newPoint = new Point(Number(points[0]), Number(points[1]));
        this.points.push(newPoint);
        newPoint.draw();
      }
    });
  }

  fast() {
    let points = this.points;
    let segs = [];

    for (let i = 0; i < points.length; i++) {
      let p      = points[i];
      let slopes = {};

      for (let j = 0; j < points.length; j++) {
        if (i === j) { continue; }
        let q = points[j];

        // Find all the slopes that other points make with p
        let slope = p.slopeTo(q);
        if (slopes[slope] === undefined) {
          slopes[slope] = [p, q];
        } else {
          slopes[slope].push(q);
        }
      }

      Object.keys(slopes).forEach((slope) => {
        // Retrieve all points with the same relative slope to p
        let points = slopes[slope];

        // Check for the furthest points on a segment if there are at least 4
        if (points.length >= 4) {
          let maxDistance = 0;
          let edgePoints  = null;

          // Find the two points with the greatest euclidean distance
          for (let a = 0; a < points.length - 1; a++) {
            for (let b = a + 1; b < points.length; b++) {
              let distance = points[a].distance(points[b]);
              if (distance > maxDistance) {
                maxDistance = distance;
                edgePoints  = [points[a], points[b], distance, Number(slope)];
              }
            }
          }

          // Update all sub-segments with larger segments and ensure no duplicates
          let exists = false;
          let replacementIndex;
          let replacement;

          for (let c = 0; c < segs.length; c++) {
            let seg = segs[c];

            if (seg[3] === edgePoints[3]) {
              if ((seg[0].x === edgePoints[0].x && seg[0].y === edgePoints[0].y)
                || (seg[1].x === edgePoints[1].x && seg[1].y === edgePoints[1].y)
                || (seg[0].x === edgePoints[1].x && seg[0].y === edgePoints[1].y)
                || (seg[1].x === edgePoints[0].x && seg[1].y === edgePoints[0].y)) {

                // Found something that belongs to the same line segment
                exists = true;

                if (edgePoints[2] > seg[2]) {
                  // Replace only if the euclidean distance is bigger
                  replacementIndex = c;
                  replacement = edgePoints;
                }
              }
            }
          }

          // Perform replacement outside of the iteration loop
          if (replacementIndex && replacement) {
            segs[replacementIndex] = replacement;
          }

          if (!exists) {
            // Push into line segments if we find a novel segment
            segs.push(edgePoints);
          }
        }
      });
    }

    segs.forEach((seg) => {
      let newLine = new LineSegment(seg[0], seg[1]);
      this.lineSegments.push(newLine);
      newLine.draw();
      this.number++;
    });
  }

  numberOfSegments() {
    return this.number;
  }

  printLineSegments() {
    this.lineSegments.forEach((line) => {
      console.log(line.toString());
    });
  }
}

if (typeof(document) === 'undefined' && !module.parent) {
  const data = fs.readFileSync('../../input/mergesort/input1000.txt', 'utf-8');
  const fcp = new FastCollinearPoints(data);
  fcp.fast();
  fcp.printLineSegments();
  console.log(fcp.numberOfSegments());
}
