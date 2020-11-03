'use strict';

let DEBOUNCE_INTERVAL = 500; // ms

window.debounce = (cb) => {
  let lastTimeout = null;

  const innerDebounce = (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };

  return innerDebounce();
};

