'use strict';
(function () {
  const ENTER_CODE = 13;
  const LEFT_MOUSE_BUTTON_CODE = 0;
  const theMap = document.querySelector(`.map`);

  const setInnactiveState = function () {
    theMap.classList.add(`map--faded`);

    window.form.setInnactiveState();
    window.mapFilters.setInnactive();
  };

  const onLoad = function (pinsData) {
    theMap.classList.remove(`map--faded`);
    window.mapFilters.setActive();
    window.map.pins = pinsData;
    const top5Pins = window.mapFilters.getTop5Pins(pinsData);
    window.map.updateData(top5Pins);
    window.form.setActiveState();
  };

  const setActiveState = function () {
    window.backend.load(onLoad, window.util.onError);
  };

  const mapPinMain = document.querySelector(`.map__pin--main`);
  mapPinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON_CODE) {
      setActiveState();
    }
  });

  mapPinMain.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === ENTER_CODE) {
      setActiveState();
    }
  });

  const closeCard = function () {
    //
  };

  window.map = {
    pins: [],
    closeCard,
    setInnactive: setInnactiveState,
    setActive: setActiveState,
    updateData(pinsData) {
      window.mapPins.create(pinsData);
    }
  };

})();
