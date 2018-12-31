export default function JamesSiena(L = 500) {
  let colors = ['royalblue', 'magenta', 'cornsilk', 'chocolate'];

  let toRad = (deg) => { return deg * Math.PI / 180; };

  return function rectangle(
    context,
    x = document.body.clientWidth / 3,
    y = document.body.clientHeight / 3,
    length = L,
    color = 0,
    generation = 0
  ) {
    if (length < 10) { return; }

    context.fillStyle = colors[color];
    let nextcolor = (color + 1) % 4;
    let nextgen = generation + 1

    //context.translate(length/2, -2*length);

    context.translate(length/3, length/6);
    context.rotate(toRad(-90 * generation)); // skip first generation

    context.fillRect(x, y, length, length/2);
    context.resetTransform();
    rectangle(context, x, y, length/2, nextcolor, nextgen);

    switch (generation) {
      case 0:
        //context.fillRect(x + padx, y + pady, width - 3*padx, height - 2*pady);
        //rectangle(context, width + 2*padx, y + pady, width/2, height/2, color, nextgen);
        //rectangle(context, nextcolor, 0);
        break;
      case 1:
        //context.fillRect();
        //rectangle(context, color, nextgen);
        //rectangle(context, nextcolor, 0);
        break;
      case 2:
        //context.fillRect();
        //rectangle(context, color, nextgen);
        //rectangle(context, nextcolor, 0);
        break;
      case 4:
        //context.fillRect();
        //rectangle(context, color, nextgen);
        //rectangle(context, nextcolor, 0);
        break;
      case 5:
        //context.fillRect(context, color, nextgen);
        //rectangle(context, nextcolor, 0);
        break;
      default: break;
    }

  }
}

