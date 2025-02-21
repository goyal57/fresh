let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchMoveX = 0;
    this.touchMoveY = 0;
    this.prevTouchX = 0;
    this.prevTouchY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.currentX = 0;
    this.currentY = 0;
    this.rotating = false;

    this.init();
  }

  init() {
    this.paper.style.transform = `rotateZ(${this.rotation}deg)`;

    this.paper.addEventListener("touchstart", (e) => this.startMove(e), { passive: false });
    this.paper.addEventListener("touchmove", (e) => this.move(e), { passive: false });
    this.paper.addEventListener("touchend", () => this.endMove());

    this.paper.addEventListener("gesturestart", (e) => {
      e.preventDefault();
      this.rotating = true;
    });

    this.paper.addEventListener("gestureend", () => {
      this.rotating = false;
    });
  }

  startMove(e) {
    if (this.holdingPaper) return;
    
    this.holdingPaper = true;
    this.paper.style.zIndex = highestZ++;
    
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.prevTouchX = this.touchStartX;
    this.prevTouchY = this.touchStartY;
  }

  move(e) {
    e.preventDefault();
    if (!this.holdingPaper) return;

    this.touchMoveX = e.touches[0].clientX;
    this.touchMoveY = e.touches[0].clientY;

    this.velX = this.touchMoveX - this.prevTouchX;
    this.velY = this.touchMoveY - this.prevTouchY;

    this.currentX += this.velX;
    this.currentY += this.velY;

    if (this.rotating) {
      const deltaX = this.touchMoveX - this.touchStartX;
      const deltaY = this.touchMoveY - this.touchStartY;
      this.rotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    }

    this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotateZ(${this.rotation}deg)`;

    this.prevTouchX = this.touchMoveX;
    this.prevTouchY = this.touchMoveY;
  }

  endMove() {
    this.holdingPaper = false;
    this.rotating = false;
  }
}

document.querySelectorAll(".paper").forEach(paper => new Paper(paper));

