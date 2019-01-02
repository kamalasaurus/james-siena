import Canvas from './modules/Canvas.js';
import JamesSiena from './modules/JamesSiena.js';

(function() {
  (new Canvas(
    document,
    JamesSiena()
  ))
    .append()
    .resize()
    .render();
})();

