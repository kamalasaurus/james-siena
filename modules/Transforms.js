export default (function() {

  const φ = ((1 + Math.sqrt(5)) / 2);
  const 𝝉 = Math.PI/2;

  const translateX = (x, width, angle) => {
    return x + width * Math.cos(angle);
  };

  const translateY = (y, height, angle) => {
    return y + height * Math.sin(angle);
  };

  const shiftOrigin = (
    previousX,
    previousY,
    previousWidth,
    previousHeight,
    previousAngle,
    yFirst,
    shouldFlip = false
  ) => {

    const width = shouldFlip ?
      previousWidth :
      yFirst ?
        previousWidth :
        previousWidth/2;

    const height = shouldFlip ?
      previousHeight :
      yFirst ?
        previousHeight/2 :
        previousHeight;

    const angle = previousAngle + 𝝉;

    const x = yFirst ?
      translateX(previousX, previousWidth, angle) :
      translateX(previousX, previousWidth, previousAngle);

    const y = yFirst ?
      translateY(previousY, previousHeight, previousAngle) :
      translateY(previousY, previousHeight, angle);

    return {width, height, angle, origin: {x, y}};
  };

  const minVertex = (
    currentX,
    currentY,
    currentWidth,
    currentHeight,
    currentAngle,
    yFirst
  ) => {
    const {width, height, angle, origin} = shiftOrigin(currentX, currentY, currentWidth, currentHeight, currentAngle, yFirst);
    return {
      x: Math.min(currentX, origin.x),
      y: Math.min(currentY, origin.y)
    };
  };

  const shiftInnerOrigin = (
    previousX,
    previousY,
    previousWidth,
    previousHeight,
    previousAngle,
    yFirst,
    shouldFlip = false
  )  => {

    const width = shouldFlip ?
      previousWidth :
      yFirst ?
        previousWidth :
        previousWidth/2;

    const height = shouldFlip ?
      previousHeight :
      yFirst ?
        previousHeight/2 :
        previousHeight;

    const angle = previousAngle - 𝝉;

    const x = yFirst ?
      translateX(previousX, previousWidth, previousAngle) :
      translateX(previousX, previousWidth, angle);

    const y = yFirst ?
      translateY(previousY, previousHeight, -previousAngle) :
      translateY(previousY, previousHeight, -angle);

    return {width, height, angle, origin: {x, y}};

  };

  return {
    φ,
    shiftOrigin,
    minVertex,
    shiftInnerOrigin
  };

})();

