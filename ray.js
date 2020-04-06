class Ray {
   constructor(x, y, direction) {
      this.position = createVector(x, y);
      this.direction = p5.Vector.fromAngle(direction);
   }

   // a method that returns the point of intersection between the ray and a wall (if any)
   pointOfIntersection(wall) {
      // notations
      let x1 = wall.a.x;
      let y1 = wall.a.y;
      let x2 = wall.b.x;
      let y2 = wall.b.y;
      let x3 = this.position.x;
      let y3 = this.position.y;
      let x4 = this.position.x + this.direction.x;
      let y4 = this.position.y + this.direction.y;

      let d = det(x1 - x2, x3 - x4, y1 - y2, y3 - y4);
      // if d is 0, then the ray is parallel to the wall
      if (d == 0) return;

      let t = det(x1 - x3, x3 - x4, y1 - y3, y3 - y4) / d;
      let u = -det(x1 - x2, x1 - x3, y1 - y2, y1 - y3) / d;

      // if t is between 0 and 1, then the point of intersection is on the wall
      // if u is greater than 0, then the point of intersection is in front of the ray (not behind it)
      if (t >= 0 && t <= 1 && u >= 0) {
         return createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
      } else return;
   }

   // a method that finds the closest wall to the ray and draws a line from the ray to that wall
   findWall() {
      let minDist = Infinity;
      let point;
      let ang;
      for (let wall of walls) {
         let p = this.pointOfIntersection(wall);
         if (p) {
            let angle = player.orientation.heading() - this.direction.heading();

            let d = this.position.dist(p); // * cos(angle);
            if (d < minDist) {
               minDist = d;
               point = p;
               ang = angle;
            }
         }
      }
      //if (point) {
      //   stroke(255, 10);
      //   line(this.position.x, this.position.y, point.x, point.y);
      //}
      // add the distance to the scene view
      view.push(minDist * cos(ang));
   }
}
