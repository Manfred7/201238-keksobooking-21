'use strict';

(() => {
  let DEBOUNCE_INTERVAL = 500; // ms

  window.debounce = (cb) => {
    let lastTimeout = null;

    const innerHandler = (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };

    return innerHandler();
  };
})();
