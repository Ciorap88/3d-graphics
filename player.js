class Player {
   constructor(x, y) {
      this.position = createVector(x, y);
      this.orientation = p5.Vector.fromAngle(0, 0.5);
      // the field of view of the player
      this.fov = 90;
   }

   // the player can move forward and backward, according to its orientation angle
   move() {
      if (keyIsDown(38)) {
         this.position.add(this.orientation);
      }
      if (keyIsDown(40)) {
         this.position.sub(this.orientation);
      }
      for (let ray of rays) ray.position = this.position;
   }

   // rotate the orientation of the player and the direction of every ray by 1 degree
   rotate() {
      if (keyIsDown(37)) {
         let angle = this.orientation.heading();
         angle -= radians(1);
         this.orientation = p5.Vector.fromAngle(angle, 0.5);
         for (let ray of rays) {
            let angle = ray.direction.heading();
            angle -= radians(1);
            ray.direction = p5.Vector.fromAngle(angle);
         }
      }
      if (keyIsDown(39)) {
         let angle = this.orientation.heading();
         angle += radians(1);
         this.orientation = p5.Vector.fromAngle(angle, 0.5);
         for (let ray of rays) {
            let angle = ray.direction.heading();
            angle += radians(1);
            ray.direction = p5.Vector.fromAngle(angle);
         }
      }
   }
}
