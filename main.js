class Rate {
  constructor(selectorName, options) {
    // type： "pie" || "linePress" || "sandGlass"
    this.type = options.type || "pie";
    this.selectorString = "[data-name='" + selectorName +"']";
    this.container = document.body.querySelector( this.selectorString);
    this.rotate = options.rotate || this.container.getAttribute("data-rate");
    this.initRotate = 0;
    this.color = options.color || "green";
  }
  render() {
    const s = setInterval(() => {
      this.initRotate++;
      if (this.initRotate >= this.rotate) {
        clearInterval(s);
      }
      if (this.container) {
        switch (this.type) {
          case "pie":
            this.renderPie(this.initRotate);
            break;
          case "linePress":
            this.renderLine(this.initRotate);
            break;
          case "sandGlass":
            this.renderSandGlass(this.initRotate);
            break;
          default:
            break;
        }
      }
    }, 16);
  }

  renderPie(rotate) {
    const content = `<div></div><span>${rotate}%</span>`;
    this.container.innerHTML = content;
    this.container.className = "pie";
    const rateDive = this.container.children[0];

    if (rotate < 50) {
      rateDive.style.transform = `rotate(${rotate / 100}turn)`;
    } else {
      this.container.className = "pie pieMore50";
      rateDive.id = "roaterMore50";
      let rotate = parseInt(rotate) - 100;
      rateDive.style.transform = `rotate(${rotate / 100}turn)`;
    }
  }
  renderLine(rotate) {
    const content = `<div><span>${rotate}%</span></div>`;
    this.container.innerHTML = content;
    this.container.className = "progress";
    const rateDive = this.container.children[0];
    const showData = rateDive.children[0];
    rateDive.style.background = `linear-gradient(to right, greenyellow ${rotate}%, gray ${rotate}%)`;
  }
  renderSandGlass(rotate) {
    const content = `<div></div>`;
    this.container.innerHTML = content;
    const out = (1 - rotate / 100) * 2500;
    const restLen = Math.sqrt(out) * 2;
    const outLen = 100 - restLen;
    const bottom = restLen + 100;
    this.container.className = "sandGlass";
    this.container.style.background = `linear-gradient(to bottom, gray ${outLen}px, greenyellow ${outLen}px, gray ${bottom}px,
        greenyellow ${bottom}px)`;
    // 'linear-gradient(to bottom, gray  ' +
    // outLen + 'px, greenyellow  ' + outLen + 'px, greenyellow 100px, gray 100px, gray ' + bottom + 'px, greenyellow ' + bottom + 'px)';
  }
}
const rate = new Rate("pieProgress",  {
  type: "pie",
  rotate: 40,
  color: "red"
});
rate.render();
const linePress = new Rate("lineProgress", {
  type: "linePress",
  rotate: 60,
  color: "red"
});
linePress.render();
const sandGlass = new Rate("sandProgress",  {
  type: "sandGlass",
  rotate: 80,
  color: "red"
});
sandGlass.render();
