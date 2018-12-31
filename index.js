import Canvas from './modules/Canvas.js';
import JamesSiena from './modules/JamesSiena.js';

(function() {
  (new Canvas(JamesSiena()))
    .append()
    .resize()
    .render();
})();

