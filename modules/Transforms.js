export default (function() {

  const threshold = (num) => {
    // 6.123233995736766e-10 is the x value from rotate(-Math.PI/2, 10000000, 0)
    // so, the assumption is the length of the vector will always be less than
    // 10000000
    return (num < 6.123233995736766e-10) ?
      0 :
      num;
  };

  const rotate = (ϑ, x, y) => {
    with (Math) {
      return {
        x: threshold(x*cos(ϑ) - y*sin(ϑ)),
        y: threshold(x*sin(ϑ) + y*cos(ϑ))
      }
    }
  };

  const translate = () => {
    //
  };

  const shiftOrigin = ({x, y}, length, angle1, angle2) {
    
  }

  return {
    shiftOrigin,
    rotatedOrigin
  };

})();

