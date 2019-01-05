export default (function() {

  const φ = ((1 + Math.sqrt(5)) / 2);
  const 𝝉 = Math.PI/2;

  //const threshold = (num) => {
    //// 6.123233995736766e-10 is the x value from rotate(-Math.PI/2, 10000000, 0)
    //// so, the assumption is the length of the vector will always be less than
    //// 10000000
    //return (num < 6.123233995736766e-10) ?
      //0 :
      //num;
  //};

  //const rotate = (ϑ, x, y) => {
    //return {
      //x: threshold(x*Math.cos(ϑ) - y*Math.sin(ϑ)),
      //y: threshold(x*Math.sin(ϑ) + y*Math.cos(ϑ))
    //}
  //};

  const translateX = (x, width, angle) => {
    return x + width * Math.cos(angle);
  };

  const translateY = (y, height, angle) => {
    return y + height * Math.sin(angle);
  }

  const shiftOrigin = (
    previousX,
    previousY,
    previousWidth,
    previousHeight,
    previousAngle,
    yFirst,
    shouldFlip
  ) => {
    // if shouldFlip??
    const width = yFirst ? previousWidth : previousWidth/2;
    const height = yFirst ? previousHeight/2 : previousHeight;
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
    yFirst,
    shouldFlip
  ) => {
    // if shouldFLip??
    const {width, height, angle, origin} = shiftOrigin(currentX, currentY, currentWidth, currentHeight, currentAngle, yFirst, shouldFlip);
    return {
      x: Math.min(currentX, origin.x),
      y: Math.min(currentY, origin.y)
    };
  };

  return {
    φ,
    shiftOrigin,
    minVertex
  };

})();

