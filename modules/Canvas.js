// assumptions: parent element is not a resizable HTMLElement like a
// HTMLTextAreaElement, in which case nothing is going to work right
//
// implicitly, in the case of an iframe, it should already be rendered
// to the parent document

export default class Canvas {

  constructor(
    parent,
    subrender = () => console.log('pass cool canvas operations here'),
    contextType = '2d'
  ) {
    console.assert(
      parent instanceof HTMLElement,
      'first argument must be a valid HTMLElement'
    );

    const doc = parent.getRootNode();
    const win = doc.defaultView;

    this.parent = parent;
    this.subrender = subrender;

    this.canvas = doc.createElement('canvas');
    this.context = this.canvas.getContext(contextType);

    this.style();

    if (parent instanceof HTMLBodyElement)
      win.addEventListener('resize', this.resize.bind(this));
  }

  style() {
    (new Map([
      ['position', 'absolute'],
      ['width', '100%'],
      ['height', '100%']
    ])).forEach((value, name) => this.canvas.style[name] = value);
  }

  resize() {
    this.canvas.setAttribute('width', this.parent.clientWidth);
    this.canvas.setAttribute('height', this.parent.clientHeight);
    this.render();
    return this;
  }

  render() {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.subrender(this.context);
    return this;
  }

  append() {
    this.parent.appendChild(this.canvas);
    return this;
  }

}

