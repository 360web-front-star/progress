
class Rate {
  constructor(id, type = 'pie') {
    this.type = type;
    this.container = document.getElementById(id);
    this.rotate = this.container.getAttribute('data-rate');
  }
  render() {
    if (this.container && this.rotate) {
      switch (this.type) {
        case 'pie':
          this.renderPie();
          break;
        case 'linePress':
          this.renderLine();
          break;
        case 'sandGlass':
          this.renderSandGlass();
          break;
        default:
          break;
      }
    }
  }
  renderPie() {
    const content = `<div></div><span>${this.rotate}%</span>`;
    this.container.innerHTML = content;
    this.container.className = 'pie';
    const rateDive = this.container.children[0];
    if (this.rotate < 50) {
      rateDive.style.transform = `rotate(${this.rotate/100}turn)`;
    } else {
      this.container.className = 'pie pieMore50';
      rateDive.id = 'roaterMore50';
      const rotate = parseInt(this.rotate) - 100;
      rateDive.style.transform = `rotate(${rotate/100}turn)`;
    }
  }
  renderLine() {
    const content = `<div><span>${this.rotate}%</span></div>`;
    this.container.innerHTML = content;
    this.container.className = 'progress';
    const rateDive = this.container.children[0];
    const showData = rateDive.children[0];
    rateDive.style.background =
      `linear-gradient(to right, greenyellow ${this.rotate}%, gray ${this.rotate}%)`;
  }
  renderSandGlass() {
    const content = `<div></div>`;
    this.container.innerHTML = content;
    const out = (1 - (this.rotate / 100)) * 2500;
    const restLen = Math.sqrt(out) * 2;
    const outLen = 100 - restLen;
    const bottom = restLen + 100;
    this.container.className = 'sandGlass';
    this.container.style.background =
      `linear-gradient(to bottom, gray ${outLen}px, greenyellow ${outLen}px, gray ${bottom}px,
        greenyellow ${bottom}px)`;
      // 'linear-gradient(to bottom, gray  ' +
      // outLen + 'px, greenyellow  ' + outLen + 'px, greenyellow 100px, gray 100px, gray ' + bottom + 'px, greenyellow ' + bottom + 'px)';
  }
}

const rate = new Rate('pie__plugin', 'pie');
rate.render();
const linePress = new Rate('progress__plugin', 'linePress');
linePress.render();
const sandGlass = new Rate('sandGlass__plugin', 'sandGlass');
sandGlass.render();