import MovingDirection from './MovingDirection.js';

export default class Pacman {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    //! Прописываем пустые переменны для передвежения pacman
    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;

    document.addEventListener('keydown', this.#keydown);

    this.#loadPacmanImages();
  }

  draw(ctx) {
    this.#move();
    ctx.drawImage(
      this.pacmanImages[this.pacmanImageIndex],
      this.x,
      this.y,
      this.tileSize,
      this.tileSize
    );
  }

  #loadPacmanImages() {
    const pacmanImage1 = new Image();
    pacmanImage1.src = '../images/pac0.png';

    const pacmanImage2 = new Image();
    pacmanImage2.src = '../images/pac1.png';

    const pacmanImage3 = new Image();
    pacmanImage3.src = '../images/pac2.png';

    const pacmanImage4 = new Image();
    pacmanImage4.src = '../images/pac1.png';

    this.pacmanImages = [
      pacmanImage1,
      pacmanImage2,
      pacmanImage3,
      pacmanImage4,
    ];

    this.pacmanImageIndex = 0;
  }

  //! Логи для управления packman
  #keydown = (event) => {
    console.log('event', event.target);
    //up
    if (event.keyCode == 87) {
      if (this.currentMovingDirection == MovingDirection.down)
        this.currentMovingDirection = MovingDirection.up;
      this.requestedMovingDirection = MovingDirection.up;
    }
    //down
    if (event.keyCode == 83) {
      if (this.currentMovingDirection == MovingDirection.up)
        this.currentMovingDirection = MovingDirection.down;
      this.requestedMovingDirection = MovingDirection.down;
    }
    //left
    if (event.keyCode == 65) {
      if (this.currentMovingDirection == MovingDirection.right)
        this.currentMovingDirection = MovingDirection.left;
      this.requestedMovingDirection = MovingDirection.left;
    }
    //right
    if (event.keyCode == 68) {
      if (this.currentMovingDirection == MovingDirection.left)
        this.currentMovingDirection = MovingDirection.right;
      this.requestedMovingDirection = MovingDirection.right;
    }
  };

  #move() {
    if (this.currentMovingDirection !== this.requestedMovingDirection) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
        this.currentMovingDirection = this.requestedMovingDirection;
      }
    }

    switch (this.currentMovingDirection) {
      case MovingDirection.up:
        this.y -= this.velocity;
        break;

      case MovingDirection.down:
        this.y += this.velocity;
        break;

      case MovingDirection.left:
        this.x -= this.velocity;
        break;

      case MovingDirection.right:
        this.x += this.velocity;
        break;
    }
  }
}

// Pacman(
//     column * this.tileSize,
//     row * this.tileSize,
//     this.tileSize,
//     velocity,
//     this
//   );
