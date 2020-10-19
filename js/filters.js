'use strict';
(function () {

  const MAX_PINS_COUNT = 5;
  const mapFilters = document.querySelector(`.map__filters`);
  const mapFiltersFieldsets = mapFilters.querySelectorAll(`fieldset`);
  const mapFilterSelects = mapFilters.querySelectorAll(`.map__filter`);

  const getTop5Pins = function (arr) {
    let result = [];
    let count = arr.length <= MAX_PINS_COUNT ? arr.length : MAX_PINS_COUNT;

    for (let i = 0; i < count; i++) {
      result.push(arr[i]);
    }

    return result;
  };

  const setHousingPriceFilter = function () {
    const inputHousingPrice = mapFilters.querySelector(`select[name="housing-price"]`);

    inputHousingPrice.addEventListener(`change`, function () {
      window.map.closeCard();
    });

  };
  const setHousingRoomsFilter = function () {
    const inputHousingRooms = mapFilters.querySelector(`select[name="housing-rooms"]`);

    inputHousingRooms.addEventListener(`change`, function () {
      window.map.closeCard();
    });
  };

  const setHousingGuests = function () {
    const inputHousingGuests = mapFilters.querySelector(`select[name="housing-guests"]`);

    inputHousingGuests.addEventListener(`change`, function () {
      window.map.closeCard();
    });
  };

  const setInputHousingTypeFilter = function () {

    const inputHousingType = mapFilters.querySelector(`select[name="housing-type"]`);

    inputHousingType.addEventListener(`change`, function () {

      const sameHousingTypePins = window.map.pins.filter(function (pin) {
        return pin.offer.type === inputHousingType.value;
      });

      let filtredPins = [];
      if (inputHousingType.value === `any`) {
        filtredPins = window.map.pins;
      } else {
        filtredPins = sameHousingTypePins;
      }
      const top5Pins = getTop5Pins(filtredPins);
      window.map.updateData(top5Pins);
      window.map.closeCard();
    });
  };

  window.mapFilters = {
    getTop5Pins,
    setInnactive() {
      mapFilters.classList.add(`map__filters--disabled`);
      window.util.disableArrayElements(mapFiltersFieldsets, true);
      window.util.disableArrayElements(mapFilterSelects, true);

    },
    setActive() {
      mapFilters.classList.remove(`map__filters--disabled`);
      window.util.disableArrayElements(mapFiltersFieldsets, false);
      window.util.disableArrayElements(mapFilterSelects, false);
      setInputHousingTypeFilter();
      setHousingPriceFilter();
      setHousingRoomsFilter();
      setHousingGuests();
    }
  };

})();

