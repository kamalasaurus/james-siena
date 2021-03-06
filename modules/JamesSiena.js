import T from './Transforms.js';

export default function JamesSiena(
  L = 500,
  colors = ['royalblue', 'magenta', 'cornsilk', 'chocolate']
) {

  const nextRect = ({
    generation: previousGeneration,
    nesting: previousNesting,
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
    const nesting = previousNesting;
    const color = previousColor;
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

    const topLeft = T.minVertex(
      origin.x,
      origin.y,
      width,
      height,
      angle,
      coords.yFirst
    );

    coords.origin = origin;
    coords.topLeft = topLeft;

    return {generation, nesting, color, width, height, angle, coords};
  };

  const innerRect = (
    context,
    {
      generation: previousGeneration,
      nesting: previousNesting,
      color: previousColor,
      width: previousWidth,
      height: previousHeight,
      angle: previousAngle,
      coords: {
        origin: previousOrigin,
        topLeft: previousTopLeft,
        yFirst: previousYFirst
      }
    }
  ) => {
    const generation = 0;
    const nesting = previousNesting + 1;
    const color = (previousColor + 1) % 4;
    const coords = {
      yFirst: !previousYFirst
    };

    const shouldFlip = previousGeneration === 5;

    if (shouldFlip) {
      context.fillStyle = 'lightblue';
      const xPad = 1 * nesting;
      const yPad = 1 * nesting;
      context.fillRect(previousTopLeft.x + xPad, previousTopLeft.y + yPad, previousWidth - 2*xPad, previousHeight - 2*yPad);

    } else {

    const {width, height, angle, origin} = T.shiftInnerOrigin(
      previousOrigin.x,
      previousOrigin.y,
      previousWidth,
      previousHeight,
      previousAngle,
      previousYFirst,
      shouldFlip
    );

    const topLeft = T.minVertex(
      origin.x,
      origin.y,
      width,
      height,
      angle,
      coords.yFirst
    );

    coords.origin = origin;
    coords.topLeft = topLeft;

    fractalRect(context, {generation, nesting, color, width, height, angle, coords});
  }
  };

  // this would be a lot simpler if it was point based instead of rect-based
  // each rect is drawn along the diagonal b/w 2 consecutive points.  Too lazy
  // to refactor now.

  // yFirst accounts for traversal being -pi/2•x, -pi•y -> -pi•y, -3pi/2•x ->
  // -3pi/2•x, -2pi•y -> -2pi•y, -5pi/2•x;
  const fractalRect = (
    context,
    rect = {
      generation: 0,
      nesting: 1,
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
    if (rect.width < 30 || rect.height < 30 || rect.generation > 5) return;

    const xPad = 1 * rect.nesting;
    const yPad = 1 * rect.nesting;

    context.fillStyle = colors[rect.color];
    context.fillRect(rect.coords.topLeft.x + xPad, rect.coords.topLeft.y + yPad, rect.width - 2*xPad, rect.height - 2*yPad);

    innerRect(context, rect);
    fractalRect(context, nextRect(rect));
  };

  return fractalRect;
}

