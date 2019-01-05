import T from './Transforms.js';

export default function JamesSiena(
  L = 500,
  colors = ['royalblue', 'magenta', 'cornsilk', 'chocolate']
) {


  //nextForm = { ... }
  //nextRec = (prevRec) => prevRec.map((v, n) => nextForm[n](v))

  const nextRect = ({
    generation: previousGeneration,
    color: previousColor,
    width: previousWidth,
    height: previousHeight,
    angle: previousAngle,
    coords: {
      origin: previousOrigin,
      topLeft: previousTopLeft,
      yFirst: previousYFirst
    }
  }) => {
    const generation = previousGeneration + 1;
    const color = (previousColor + 1) % 4;
    const coords = {
      yFirst: !previousYFirst
    };

    const shouldFlip = generation === 5;

    const {width, height, angle, origin} = T.shiftOrigin(
      previousOrigin.x,
      previousOrigin.y,
      previousWidth,
      previousHeight,
      previousAngle,
      previousYFirst,
      shouldFlip
    );

    const topLeft = T.minVertex(origin.x, origin.y, width, height, angle, coords.yFirst, shouldFlip);

    coords.origin = origin;
    coords.topLeft = topLeft;

    return {generation, color, width, height, angle, coords};
  };


  const innerRect = ({
    generation: previousGeneration,
    color: previousColor,
    width: previousWidth,
    height: previousHeight,
    angle: previousAngle,
    coords: {
      origin: previousOrigin,
      topLeft: previousTopLeft,
      yFirst: previousYFirst
    }
  }) => {
    let generation = 0;
    let color = (previousColor + 1) % 4;
    let height = previousHeight*T.φ;
    let angle = -rotationAngle * previousGeneration;
    let coords = {
      yFirst: !previousYFirst
    };

    //coords.origin = T.shiftOrigin(previousOrigin, previousLength, previousAngle, angle, previousYFirst);
    coords.topLeft = ''

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
      width: L,
      height: L / T.φ,
      angle: 0,
      coords: {
        origin: {x: 0, y: 0},
        topLeft: {x: 0, y: 0}, // accounts for canvas having to draw from top-left
        yFirst: false
      }
    }
  ) => {
    if (rect.length < 10 || rect.generation > 5) return;

    context.fillStyle = colors[rect.color];
    context.fillRect(rect.coords.topLeft.x, rect.coords.topLeft.y, rect.width, rect.height);

    //fractalRect(context, innerRect(rect));
    fractalRect(context, nextRect(rect));
  };

  return fractalRect;
}

