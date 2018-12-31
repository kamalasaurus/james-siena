export default class Canvas {

  constructor(
    subrender = function() { console.log('render'); },
    rerender = true
  ) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    this.subrender = subrender;

    window.addEventListener('resize', this.resize.bind(this, rerender));
  }

  resize(rerender = false) {
    this.canvas.setAttribute('width', document.body.clientWidth);
    this.canvas.setAttribute('height', document.body.clientHeight);
    if (rerender) { this.render(); }
    return this;
  }

  render() {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.subrender();
    return this;
  }

  append() {
    document.body.appendChild(this.canvas);
    return this;
  }

}

