class Rate {
  constructor(selectorName, options) {
    // options: type || rotate || color
    // 用户自定义属性
    this.type = options.type || "pie";
    this.color = options.color || "greenyellow";
    this.selectorString = "[data-name='" + selectorName + "']";
    this.container = document.body.querySelector(this.selectorString);
    this.rotate = this.container.getAttribute("data-rate") || options.rotate;
    this.initRotate = 0;
  }
  // 渲染函数
  render() {
    if (this.container) {
      // 从0%到当前值
      const s = setInterval(() => {
        this.initRotate++;
        if (this.initRotate > this.rotate) {
          clearInterval(s);
          this.initRotate = 0;
        } else {
          switch (this.type) {
            case "pie":
              this.renderPie(this.initRotate, this.color);
              break;
            case "linePress":
              this.renderLine(this.initRotate, this.color);
              break;
            case "sandGlass":
              this.renderSandGlass(this.initRotate, this.color);
              break;
            default:
              break;
          }
        }
      }, 16);
    }
  }
  defineColor(el, color) {
    el.style.setProperty(
      "--color",
      `linear-gradient(to right, transparent 50%, ${color} 0)`
    );
    el.style.setProperty("--bg", "#f0f0f0");
    el.style.setProperty(
      "--color2",
      `linear-gradient(to left, transparent 50%, #f0f0f0 0)`
    );
    el.style.setProperty("--bg2", `${color}`);
  }
  renderPie(rotate, color) {
    const content = `<div></div><span>${rotate}%</span>`;
    this.container.innerHTML = content;
    this.container.className = "pie";
    this.defineColor(this.container, color);
    const rateDive = this.container.children[0];

    if (rotate < 50) {
      rateDive.style.transform = `rotate(${rotate / 100}turn)`;
    } else {
      this.container.className = "pie pieMore50";
      rateDive.id = "roaterMore50";
      let rotate2 = parseInt(rotate) - 100;
      rateDive.style.transform = `rotate(${rotate2 / 100}turn)`;
    }
  }
  renderLine(rotate, color) {
    const content = `${rotate}%`;
    this.container.innerHTML = content;
    this.container.className = "lineProgress";
    this.container.style.background = `linear-gradient(to right, ${color} ${rotate}%, lightgray ${rotate}%)`;
  }
  renderSandGlass(rotate, color) {
    const content = `<div></div>`;
    this.container.innerHTML = content;
    // 根据三角形面积计算沙漏剩余部分的值
    // resr为剩余部分的值
    const rest = (1 - rotate / 100) * 2500;
    // restLen outLen分別为剩余部分的高和流出部分的高
    const restLen = Math.sqrt(rest) * 2;
    const outLen = 100 - restLen;
    const bottom = restLen + 100;
    this.container.className = "sandGlass";
    this.container.style.background = `linear-gradient(to bottom, gray ${outLen}px, ${color} ${outLen}px, gray ${bottom}px,
        ${color} ${bottom}px)`;
  }
  getPressValue() {
    return this.rotate;
  }
  // 获取进度值
  setPressValue(value) {
    this.rotate = value;
    this.render();
  }
}
// 创建实例并渲染
const rate = new Rate("pieProgress", {
  type: "pie",
  rotate: 66,
  color: "#adff2f"
});
rate.render();
const linePress = new Rate("lineProgress", {
  type: "linePress",
  rotate: 77,
  color: "#21bb9c"
});
linePress.render();
const sandGlass = new Rate("sandProgress", {
  type: "sandGlass",
  rotate: 88,
  color: "yellow"
});
sandGlass.render();
