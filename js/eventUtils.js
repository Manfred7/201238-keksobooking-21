'use strict';

(function () {

  const ESC_CODE = 27;
  const ENTER_CODE = 13;

  window.eventUtils = {
    isEscEvent(evt, action) {
      if (evt.keyCode === ESC_CODE) {
        action();
      }
    },
    isEscEventWithPreventDefault(evt, action) {
      window.eventUtils.isEscEvent(evt, action);
      evt.preventDefault();
    },
    isEnterEvent(evt, action) {
      if (evt.keyCode === ENTER_CODE) {
        action();
      }
    },
    isEnterEventWithPreventDefault(evt, action) {
      window.eventUtils.isEnterEvent(evt, action);
      evt.preventDefault();
    }
  };
})();


