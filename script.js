let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchX = 0;
  touchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Mouse Move
    document.addEventListener('mousemove', (e) => this.movePaper(e.clientX, e.clientY, paper));
    // Touch Move
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        let touch = e.touches[0];
        this.movePaper(touch.clientX, touch.clientY, paper);
      }
    });

    // Mouse Down
    paper.addEventListener('mousedown', (e) => this.startDrag(e.clientX, e.clientY, paper));
    // Touch Start
    paper.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        let touch = e.touches[0];
        this.startDrag(touch.clientX, touch.clientY, paper);
        e.preventDefault(); // Scrolling ko prevent karta hai
      }
    });

    // Mouse & Touch End
    window.addEventListener('mouseup', () => this.stopDrag());
    window.addEventListener('touchend', () => this.stopDrag());
  }

  startDrag(x, y, paper) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;
    
    paper.style.zIndex = highestZ;
    highestZ += 1;
    
    this.touchX = x;
    this.touchY = y;
    this.prevMouseX = x;
    this.prevMouseY = y;
  }

  movePaper(x, y, paper) {
    if (!this.holdingPaper) return;

    this.mouseX = x;
    this.mouseY = y;

    this.velX = this.mouseX - this.prevMouseX;
    this.velY = this.mouseY - this.prevMouseY;

    this.currentPaperX += this.velX;
    this.currentPaperY += this.velY;

    this.prevMouseX = this.mouseX;
    this.prevMouseY = this.mouseY;

    paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
  }

  stopDrag() {
    this.holdingPaper = false;
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
