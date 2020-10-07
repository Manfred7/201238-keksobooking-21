'use strict';
(function () {
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const DELTA_X = mapPinMain.offsetWidth / 2;
  const DELTA_Y = mapPinMain.offsetHeight;

  // создаем ноду с пином и переносим в нее данные из объекта
  const renderAd = function (template, adObj) {
    let adElement = template.cloneNode(true);
    let img = adElement.querySelector(`img`);

    img.src = adObj.author.avatar;
    img.alt = adObj.offer.title;

    adElement.style.left = `${adObj.location.x - DELTA_X}px`;
    adElement.style.top = `${adObj.location.y + DELTA_Y}px`;

    return adElement;
  };

  const makeFragment = function (ads) {
    const pinTemplate = document.querySelector(`#pin`) // берем разметку для метки из шаблона
      .content
      .querySelector(`.map__pin`);

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < ads.length; i++) {
      fragment.appendChild(renderAd(pinTemplate, ads[i]));
    }
    return fragment;
  };

  const createPins = function () {
    const pinsData = window.data.generate();
    const pins = makeFragment(pinsData);
    const theMapPins = document.querySelector(`.map__pins`);
    theMapPins.appendChild(pins);
  };

  window.mapPins = {
    create: createPins
  };

})();
