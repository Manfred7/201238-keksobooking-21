'use strict';
(function () {
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);

  const mapPinMain = document.querySelector(`.map__pin--main`);
  const DELTA_X = mapPinMain.offsetWidth / 2;
  const DELTA_Y = mapPinMain.offsetHeight;

  const address = {
    addressControl: document.querySelector(`#address`),
    setAddresCoord: function (x, y) {
      this.addressControl.value = `${x},${y}`;
    },
    setInnactiveState: function () {
      let mapPinCenterX = mapPinMain.offsetLeft + DELTA_X;
      let mapPinCenterY = mapPinMain.offsetTop + Math.floor(DELTA_Y / 2);
      this.setAddresCoord(mapPinCenterX, mapPinCenterY);
      this.addressControl.disabled = true;
    },
    setActveState: function () {
      let mapPinX = mapPinMain.offsetLeft + DELTA_X;
      let mapPinY = mapPinMain.offsetTop - DELTA_Y;
      this.setAddresCoord(mapPinX, mapPinY);
    }
  };

  const roomNumber = document.querySelector(`#room_number`);
  const capacity = document.querySelector(`#capacity`);

  const validateRoomsGestAccordance = function (evt) {
    evt.target.setCustomValidity(roomNumber.value !== capacity.value ? `Количество гостей не соответствует количеству комнат!` : ``);
    evt.target.reportValidity();
  };

  capacity.addEventListener(`change`, validateRoomsGestAccordance);
  roomNumber.addEventListener(`change`, validateRoomsGestAccordance);

  window.form = {
    setInnactiveState: function () {
      window.util.disableArrayElements(adFormFieldsets, true);
      adForm.classList.add(`ad-form--disabled`);
      address.setInnactiveState();
    },
    setActiveState: function () {
      adForm.classList.remove(`ad-form--disabled`);
      window.util.disableArrayElements(adFormFieldsets, false);
      address.setActveState();
    }
  };

})();
