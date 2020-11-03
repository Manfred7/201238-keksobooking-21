'use strict';

const theMapPins = document.querySelector(`.map__pins`);

const Features = {
  WIFI: `wifi`,
  DISHWASHER: `dishwasher`,
  PARKING: `parking`,
  WASHER: `washer`,
  CONDITIONER: `conditioner`,
  ELEVATOR: `elevator`
};

window.globals = {
  MAX_WIDTH: theMapPins.clientWidth,
  Features
};


