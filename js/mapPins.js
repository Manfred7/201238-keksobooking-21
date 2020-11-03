'use strict';

const mapPinMain = document.querySelector(`.map__pin--main`);
const DELTA_X = Math.floor(mapPinMain.offsetWidth / 2);
const DELTA_Y = mapPinMain.offsetHeight;

const renderAd = (template, adObj) => {
  let adElement = template.cloneNode(true);
  let img = adElement.querySelector(`img`);

  img.src = adObj.author.avatar;
  img.alt = adObj.offer.title;

  adElement.style.left = `${adObj.location.x - DELTA_X}px`;
  adElement.style.top = `${adObj.location.y + DELTA_Y}px`;

  adElement.addEventListener(`click`, () => {
    const obj = {
      element: adElement,
      data: adObj
    };
    window.card.show(obj);
  });

  return adElement;
};

const makeFragment = (ads) => {
  const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < ads.length; i++) {
    fragment.appendChild(renderAd(pinTemplate, ads[i]));
  }
  return fragment;
};

const clearOldPins = () => {
  let renderedPins = document.querySelectorAll(`.map__pin`);
  let pins = Array.prototype.slice.call(renderedPins);

  pins.forEach((item) => {
    if (!item.classList.contains(`map__pin--main`)) {
      item.remove();
    }
  });

};

const markActivePin = (pin) => {
  let renderedPins = document.querySelectorAll(`.map__pin`);
  let pins = Array.prototype.slice.call(renderedPins);

  pins.forEach((item) => {
    if (!item.classList.contains(`map__pin--main`)) {
      item.classList.remove(`map__pin--active`);
    }
  });

  pin.classList.add(`map__pin--active`);

};

const createPins = (pinsData) => {
  clearOldPins();
  const pins = makeFragment(pinsData);
  const theMapPins = document.querySelector(`.map__pins`);
  theMapPins.appendChild(pins);
};

window.mapPins = {
  create: createPins,
  clear: clearOldPins,
  markActive: markActivePin
};


