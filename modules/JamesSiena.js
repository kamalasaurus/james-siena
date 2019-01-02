import T from './Transforms.js';

export default function JamesSiena(L = 500) {
  const colors = ['royalblue', 'magenta', 'cornsilk', 'chocolate'];
  const φ = -Math.PI/2;

  return function rectangle(
    context,
    x = 0,
    y = 0,
    length = L,
    color = 0,
    generation = 0
  ) {
    if (length < 10) return;

    let nextcolor = (color + 1) % 4;
    let nextgen = generation + 1

    //context.translate(length/2, -2*length);

    let [x, y] = T.rotate(φ * generation, x, y); // skip first generation
    let [x, y] = T.translate(/*move the origin and get min x, y points*/)

    context.fillStyle = colors[color];
    context.fillRect(x, y, length, length/2);
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

