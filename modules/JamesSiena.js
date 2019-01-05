import T from './Transforms.js';

export default function JamesSiena(
  L = 500,
  rotationAngle = (-Math.PI/2),
  colors = ['royalblue', 'magenta', 'cornsilk', 'chocolate']
) {

  //nextForm = { ... }
  //nextRec = (prevRec) => prevRec.map((v, n) => nextForm[n](v))

  const nextRect = ({
    generation: previousGeneration,
    color: previousColor,
    length: previousLength,
    angle: previousAngle,
    coords: {
      origin: previousOrigin,
      topLeft: previousTopLeft,
      yFirst: previousYFirst
    }
  }) => {
    let generation = previousGeneration + 1;
    let color = previousColor;
    let length = previousLength/2;
    let angle = previousAngle + rotationAngle;
    let coords = {
      yFirst = !previousYFirst;
    };

    if (generation === 5) {
      coords.origin = ''
      coords.topLeft = ''
    } else {
      coords.origin = T.shiftOrigin(previousOrigin, previousLength, previousAngle, angle, previousYFirst);
      coords.topLeft = ''
    }

    let [x, y] = T.rotate(angle, x, y);
    let [x, y] = T.translate(/*move the origin and get min x, y points*/)

    return {generation, color, length, angle, coords};
  };


  const innerRect = ({
    generation: previousGeneration,
    color: previousColor,
    length: previousLength,
    angle: previousAngle,
    coords: {
      origin: previousOrigin,
      topLeft: previousTopLeft,
      yFirst: previousYFirst
    }
  }) => {
    let generation = 0;
    let color = (previousColor + 1) % 4;
    let length = previousLength/2;
    let angle = -rotationAngle * previousGeneration;
    let coords = {};

    let [x, y] = T.rotate(angle, x, y);
    let [x, y] = T.translate(/*move the origin and get min x, y points*/)

    return {generation, color, length, angle, coords};
  };


  // this actually has to use phi goddammit I knew it

  // yFirst accounts for traversal being -pi/2•x, -pi•y -> -pi•y, -3pi/2•x ->
  // -3pi/2•x, -2pi•y -> -2pi•y, -5pi/2•x; 
  const fractalRect = (
    context,
    rect = {
      generation: 0,
      color: 0,
      length: L,
      angle: 0,
      coords: {
        origin: {x: 0, y: 0},
        topLeft: {x: 0, y: 0}, // accounts for canvas having to draw from top-left
        yFirst: false
      }
    }
  ) => {
    if (length < 10 || generation > 5) return;

    context.fillStyle = colors[rect.color];
    context.fillRect(rect.topLeft.x, rect.topLeft.y, rect.length, rect.length/2);

    //fractalRect(context, innerRect(rect));
    fractalRect(context, nextRect(rect));
  };

  return fractalRect;
}

