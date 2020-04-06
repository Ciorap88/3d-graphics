let rays = [];
let walls = [];
let player;
let view = [];
const sceneW = 500;
const sceneH = 500;
const NUMBER_OF_WALLS = 20;

function setup() {
   createCanvas(sceneW, sceneH);

   // create a player (the starting point of the rays)
   player = new Player(1, 1);

   // make rays from the position of the player in every direction
   for (let a = -player.fov / 2; a < player.fov / 2; a += 0.3) {
      rays.push(new Ray(player.position.x, player.position.y, radians(a)));
   }

   // make some walls with random positions
   for (let i = 0; i < NUMBER_OF_WALLS; i++) {
      // the wall should be horizontal if orientation is smaller than 0.5, else vertical
      let orientation = random(1);
      let x = random(height);
      let y = random(width);

      if (orientation < 0.5) {
         let other = random(width);
         walls.push(new Wall(x, y, other, y));
      } else {
         let other = random(height);
         walls.push(new Wall(x, y, x, other));
      }
   }

   // the walls at the edges
   walls.push(new Wall(-1, -1, sceneW + 1, -1));
   walls.push(new Wall(-1, -1, -1, sceneH + 1));
   walls.push(new Wall(-1, sceneH + 1, sceneW + 1, sceneH + 1));
   walls.push(new Wall(sceneW + 1, -1, sceneW + 1, sceneH + 1));
}

function draw() {
   background(1, 8, 1);

   player.move();
   player.rotate();

   for (let ray of rays) {
      ray.findWall();
   }

   displaySceneView();
}

// the function to calculate the determinant of a matrix
// (used for computing the intersection point of a ray with a wall)
function det(a, b, c, d) {
   return a * d - b * c;
}

// drawing rectangles according to the walls detected by the rays
function displaySceneView() {
   // the width of the rectangles
   const w = sceneW / view.length;
   for (let i = 0; i < view.length; i++) {
      // the color and height are determined by mapping the inverse of the distance
      // to their respective ranges
      const color = map(1 / view[i], 0, 1, 0, 255) * 10;
      const h = map(1 / view[i], 0, 1, 0, sceneH) * 10;

      stroke(color);
      fill(color);
      rect(i * w, (height - h) / 2, w, h);
   }
   view = [];
}
