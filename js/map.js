'use strict';
(function () {
  const ENTER_CODE = 13;
  const LEFT_MOUSE_BUTTON_CODE = 0;

  const mapStates = {
    ACTIVE: 1,
    INNACTIVE: 0
  };

  let State = mapStates.INNACTIVE;
  const theMap = document.querySelector(`.map`);

  const mapPinMain = document.querySelector(`.map__pin--main`);
  const startX = mapPinMain.style.left;
  const startY = mapPinMain.style.top;


  const setInnactiveState = function () {
    theMap.classList.add(`map--faded`);
    mapPinMain.style.top = startY;
    mapPinMain.style.left = startX;
    window.mapPins.clear();
    window.card.close();
    window.mapFilters.setInnactive();
    window.form.setInnactiveState();

    State = mapStates.INNACTIVE;
  };

  const onLoad = function (pinsData) {
    theMap.classList.remove(`map--faded`);
    window.mapFilters.setActive();
    window.map.pins = window.mapFilters.getOnlyWithOffer(pinsData);
    const top5Pins = window.mapFilters.getTop5Pins(window.map.pins);
    window.map.updateData(top5Pins);
    window.form.setActiveState();
  };

  const setActiveState = function () {
    if (State === mapStates.INNACTIVE) { // не нужно при каждом движении метки все перезагружать, только при первом
      State = mapStates.ACTIVE;
      window.backend.load(onLoad, window.util.onError);
    }

  };

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


  mapPinMain.addEventListener(`mousedown`, function (evt) {

    if (evt.button === LEFT_MOUSE_BUTTON_CODE) {
      setActiveState();
    }

    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let coordY = (mapPinMain.offsetTop - shift.y);

      if (coordY > 630) {
        coordY = 630;
      }

      if (coordY < 130) {
        coordY = 130;
      }

      const coordX = (mapPinMain.offsetLeft - shift.x);

      mapPinMain.style.top = coordY + `px`;
      mapPinMain.style.left = coordX + `px`;

      window.form.updateAddresCoord();

    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mapPinMain.removeEventListener(`click`, onClickPreventDefault);
        };
        mapPinMain.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  const closeCard = function () {
    window.card.close();
  };

  window.map = {
    pins: [],
    closeCard,
    setInnactive: setInnactiveState,
    setActive: setActiveState,
    updateData(pinsData) {
      window.mapPins.create(pinsData);
      //  window.card.show(pinsData[0]);
    }
  };

})();
