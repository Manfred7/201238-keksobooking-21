'use strict';
(function () {
  const theMapPins = document.querySelector(`.map__pins`);

  const Features = {
    WIFI: `wifi`,
    DISHWASHER: `dishwasher`,
    PARKING: `filter-parking`,
    WASHER: `washer`,
    CONDITIONER: `conditioner`,
    ELEVATOR: `elevator`
  };

  window.globals = {
    MAX_WIDTH: theMapPins.clientWidth,
    Features
  };

})();
