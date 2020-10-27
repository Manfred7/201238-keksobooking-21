'use strict';
(function () {

  const MAX_PINS_COUNT = 5;
  const ANY_VALUE = `any`;
  const mapFilters = document.querySelector(`.map__filters`);
  const mapFiltersFieldsets = mapFilters.querySelectorAll(`fieldset`);
  const mapFilterSelects = mapFilters.querySelectorAll(`.map__filter`);

  const inputHousingType = mapFilters.querySelector(`select[name="housing-type"]`);
  const inputHousingPrice = mapFilters.querySelector(`select[name="housing-price"]`);
  const inputHousingRooms = mapFilters.querySelector(`select[name="housing-rooms"]`);
  const inputHousingGuests = mapFilters.querySelector(`select[name="housing-guests"]`);
  const fieldsetMapFeatures = mapFilters.querySelector(`.map__features`);
  const inputWifi = fieldsetMapFeatures.querySelector(`#filter-wifi`);
  const inputDishwasher = fieldsetMapFeatures.querySelector(`#filter-dishwasher`);
  const inputParking = fieldsetMapFeatures.querySelector(`#filter-parking`);
  const inputWasher = fieldsetMapFeatures.querySelector(`#filter-washer`);
  const inputElevator = fieldsetMapFeatures.querySelector(`#filter-elevator`);
  const inputConditioner = fieldsetMapFeatures.querySelector(`#filter-conditioner`);

  const features = {
    wifi: `wifi`,
    dishwasher: `dishwasher`,
    parking: `filter-parking`,
    washer: `washer`,
    conditioner: `conditioner`,
    elevator: `elevator`
  };

  const getOnlyWithOffer = function (pins) {
    const onlyWithOfferPins = pins.filter(function (pin) {
      return ((pin.offer !== undefined) && (pin.offer !== null));
    });

    return onlyWithOfferPins;
  };

  const getTop5Pins = function (arr) {
    let result = [];
    let count = arr.length <= MAX_PINS_COUNT ? arr.length : MAX_PINS_COUNT;

    for (let i = 0; i < count; i++) {
      result.push(arr[i]);
    }

    return result;
  };

  const getHousingTypeFiltred = function (pins) {
    const samePins = pins.filter(function (pin) {
      return pin.offer.type === inputHousingType.value;
    });
    let filtredPins = (inputHousingType.value === ANY_VALUE) ? pins : samePins;

    return filtredPins;
  };

  const getHousingPriceFiltred = function (pins) {
    const samePins = pins.filter(function (pin) {
      switch (inputHousingPrice.value) {
        case `low`:
          return (pin.offer.price < 10000);
        case `middle`:
          return (pin.offer.price >= 10000) && (pin.offer.price <= 50000);
        case `high`:
          return (pin.offer.price > 50000);
        default:
          return false;
      }
    });

    let filtredPins = (inputHousingPrice.value === ANY_VALUE) ? pins : samePins;

    return filtredPins;
  };

  const getHousingRoomsFiltred = function (pins) {
    const samePins = pins.filter(function (pin) {
      return (pin.offer.rooms.toString() === inputHousingRooms.value);
    });
    let filtredPins = (inputHousingRooms.value === ANY_VALUE) ? pins : samePins;

    return filtredPins;
  };

  const getHousingGuestFiltred = function (pins) {
    const samePins = pins.filter(function (pin) {
      return (pin.offer.guests.toString() === inputHousingGuests.value);
    });
    let filtredPins = (inputHousingGuests.value === ANY_VALUE) ? pins : samePins;

    return filtredPins;
  };
  const getEnabledFeatures = function () {
    let enabledFeatures = [];

    if (inputWifi.checked) {
      enabledFeatures.push(features.wifi);
    }
    if (inputDishwasher.checked) {
      enabledFeatures.push(features.dishwasher);
    }
    if (inputParking.checked) {
      enabledFeatures.push(features.parking);
    }
    if (inputWasher.checked) {
      enabledFeatures.push(features.washer);
    }
    if (inputConditioner.checked) {
      enabledFeatures.push(features.conditioner);
    }
    if (inputElevator.checked) {
      enabledFeatures.push(features.elevator);
    }
    return enabledFeatures;
  };

  const getHousingFeaturesFiltred = function (pins) {
    const enabledFeatures = getEnabledFeatures();

    const samePins = pins.filter(function (pin) {
      let allFeaturesExist = true;

      enabledFeatures.forEach(function (item) {
        if (pin.offer.features.indexOf(item) === -1) {
          allFeaturesExist = false;
          return;
        }
      });

      return allFeaturesExist;
    });
    return samePins;
  };

  const doFilter = function () {
    let filtredPins = getHousingTypeFiltred(window.map.pins);
    filtredPins = getHousingPriceFiltred(filtredPins);
    filtredPins = getHousingRoomsFiltred(filtredPins);
    filtredPins = getHousingGuestFiltred(filtredPins);
    filtredPins = getHousingFeaturesFiltred(filtredPins);

    const top5Pins = getTop5Pins(filtredPins);
    window.map.updateData(top5Pins);
    window.map.closeCard();
  };

  const applyFilter = function () {
    window.debounce(doFilter);

  };
  const setInnactiveState = function () {
    mapFilters.classList.add(`map__filters--disabled`);
    window.util.disableArrayElements(mapFiltersFieldsets, true);
    window.util.disableArrayElements(mapFilterSelects, true);
    mapFilters.reset();
  };

  const setActiveState = function () {
    mapFilters.classList.remove(`map__filters--disabled`);
    window.util.disableArrayElements(mapFiltersFieldsets, false);
    window.util.disableArrayElements(mapFilterSelects, false);

    inputHousingType.addEventListener(`change`, applyFilter);
    inputHousingPrice.addEventListener(`change`, applyFilter);
    inputHousingRooms.addEventListener(`change`, applyFilter);
    inputHousingGuests.addEventListener(`change`, applyFilter);
    fieldsetMapFeatures.addEventListener(`change`, applyFilter);
  };

  window.mapFilters = {
    getOnlyWithOffer,
    getTop5Pins,
    setInnactive: setInnactiveState,
    setActive: setActiveState
  };

})();

