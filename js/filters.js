'use strict';
(function () {

  const mapFilters = document.querySelector(`.map__filters`);
  const mapFiltersFieldsets = mapFilters.querySelectorAll(`fieldset`);
  const mapFilterSelects = mapFilters.querySelectorAll(`.map__filter`);

  window.mapFilters = {
    setInnactive: function () {
      mapFilters.classList.add(`map__filters--disabled`);
      window.util.disableArrayElements(mapFiltersFieldsets, true);
      window.util.disableArrayElements(mapFilterSelects, true);

    },
    setActive: function () {
      mapFilters.classList.remove(`map__filters--disabled`);
      window.util.disableArrayElements(mapFiltersFieldsets, false);
      window.util.disableArrayElements(mapFilterSelects, false);
    }
  };

})();

