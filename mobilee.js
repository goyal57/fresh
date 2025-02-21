let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.currentX = 0;
    this.currentY = 0;
    this.startX = 0;
    this.startY = 0;
    this.prevX = 0;
    this.prevY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.rotating = false;

    this.init();
  }

  init() {
    // Apply initial rotation
    this.paper.style.transform = `rotateZ(${this.rotation}deg)`;

    // Touch events (Mobile)
    this.paper.addEventListener("touchstart", (e) => this.startMove(e.touches[0]), false);
    this.paper.addEventListener("touchmove", (e) => this.move(e.touches[0]), false);
    this.paper.addEventListener("touchend", () => this.endMove(), false);

    // Mouse events (Desktop)
    this.paper.addEventListener("mousedown", (e) => this.startMove(e), false);
    document.addEventListener("mousemove", (e) => this.move(e), false);
    document.addEventListener("mouseup", () => this.endMove(), false);
  }

  startMove(e) {
    this.holdingPaper = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.prevX = e.clientX;
    this.prevY = e.clientY;

    // Bring paper to front
    this.paper.style.zIndex = highestZ++;
  }

  move(e) {
    if (!this.holdingPaper) return;

    this.velX = e.clientX - this.prevX;
    this.velY = e.clientY - this.prevY;

    this.currentX += this.velX;
    this.currentY += this.velY;

    this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotateZ(${this.rotation}deg)`;

    this.prevX = e.clientX;
    this.prevY = e.clientY;
  }

  endMove() {
    this.holdingPaper = false;
  }
}

// Initialize papers
document.querySelectorAll(".paper").forEach(paper => new Paper(paper));
