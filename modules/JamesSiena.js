import T from './Transforms.js';

export default function JamesSiena(
  L = 500,
  rotationAngle = (-Math.PI/2),
  colors = ['royalblue', 'magenta', 'cornsilk', 'chocolate']
) {

  const nextRect = ({
    x: previousX,
    y: previousY,
    angle: previousAngle,
    length: previousLength,
    color: previousColor,
    generation: previousGeneration
  }) => {
    let generation = previousGeneration + 1;
    let color = previousColor;
    let length = previousLength/2;
    let angle = rotationAngle * generation;

    // check for generation === 5 and do the flip instead
    let [x, y] = T.rotate(angle, x, y);
    let [x, y] = T.translate(/*move the origin and get min x, y points*/)

    return {x, y, angle, length, color, generation};
  };


  const innerRect = ({
    x: previousX,
    y: previousY,
    angle: previousAngle,
    length: previousLength,
    color: previousColor,
    generation: previousGeneration
  }) => {
    let generation = 0;
    let color = (previousColor + 1) % 4;
    let length = previousLength/2;
    let angle = -rotationAngle * previousGeneration;

    let [x, y] = T.rotate(angle, x, y);
    let [x, y] = T.translate(/*move the origin and get min x, y points*/)

    return {x, y, angle, length, color, generation};
  };


  const fractalRect = (
    context,
    rec = {
      x: 0,
      y: 0,
      angle: 0,
      length: L,
      color: 0,
      generation: 0
    }
  ) => {
    if (length < 10 || generation > 5) return;

    context.fillStyle = colors[rec.color];
    context.fillRect(x, y, rec.length, rec.length/2);

    fractalRect(context, innerRect(rec));
    fractalRect(context, nextRect(rec));
  };

  return fractalRect;
}

