'use strict';
(() => {

  const LEFT_MOUSE_BUTTON_CODE = 0;
  const LOCATION_Y_MIN = 130;
  const LOCATION_Y_MAX = 630;

  const MapStates = {
    ACTIVE: 1,
    INNACTIVE: 0
  };

  let State = MapStates.INNACTIVE;
  const theMap = document.querySelector(`.map`);

  const mapPinMain = document.querySelector(`.map__pin--main`);
  const startX = mapPinMain.style.left;
  const startY = mapPinMain.style.top;

  const setInnactiveState = () => {
    theMap.classList.add(`map--faded`);
    mapPinMain.style.top = startY;
    mapPinMain.style.left = startX;
    window.mapPins.clear();
    window.card.close();
    window.filters.setInnactive();
    window.form.setInnactiveState();

    State = MapStates.INNACTIVE;
  };

  const onLoad = (pinsData) => {
    theMap.classList.remove(`map--faded`);
    window.filters.setActive();
    window.map.pins = window.filters.getOnlyWithOffer(pinsData);
    const top5Pins = window.filters.getTop5Pins(window.map.pins);
    window.map.updateData(top5Pins);
    window.form.setActiveState();
  };

  const setActiveState = () => {
    if (State === MapStates.INNACTIVE) { // не нужно при каждом движении метки все перезагружать, только при первом
      State = MapStates.ACTIVE;
      window.backendAPI.load(onLoad, window.utils.onError);
    }

  };

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    if (evt.button === LEFT_MOUSE_BUTTON_CODE) {
      setActiveState();
    }
  });

  mapPinMain.addEventListener(`keydown`, (evt) => {
    window.eventUtils.isEnterEventWithPreventDefault(evt, setActiveState);
  });


  mapPinMain.addEventListener(`mousedown`, (evt) => {

    if (evt.button === LEFT_MOUSE_BUTTON_CODE) {
      setActiveState();
    }

    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
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

      if (coordY > LOCATION_Y_MAX) {
        coordY = LOCATION_Y_MAX;
      }

      if (coordY < LOCATION_Y_MIN) {
        coordY = LOCATION_Y_MIN;
      }

      const coordX = (mapPinMain.offsetLeft - shift.x);

      mapPinMain.style.top = coordY + `px`;
      mapPinMain.style.left = coordX + `px`;

      window.form.updateAddresCoord();

    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          mapPinMain.removeEventListener(`click`, onClickPreventDefault);
        };
        mapPinMain.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  const closeCard = () => {
    window.card.close();
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
