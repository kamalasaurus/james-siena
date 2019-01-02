export default class Canvas {

  constructor(
    doc,
    subrender = () => console.log('pass cool canvas operations here'),
    rerender = true
  ) {
    console.assert(
      doc instanceof HTMLDocument,
      'first argument must be a valid HTMLDocument'
    );

    this.doc = doc;
    this.subrender = subrender;

    this.canvas = this.doc.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    // document.defaultView === window, not IE compatible
    this.doc.defaultView
      .addEventListener('resize', this.resize.bind(this, rerender));
  }

  resize(rerender = false) {
    this.canvas.setAttribute('width', this.doc.body.clientWidth);
    this.canvas.setAttribute('height', this.doc.body.clientHeight);
    if (rerender) this.render();
    return this;
  }

  render() {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.subrender(this.context);
    return this;
  }

  append() {
    this.doc.body.appendChild(this.canvas);
    return this;
  }

}

