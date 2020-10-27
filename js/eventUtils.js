'use strict';

(function () {

  const ESC_CODE = 27;
  const ENTER_CODE = 13;

  window.eventUtils = {
    ESC_CODE,
    ENTER_CODE,

    isEscEvent(evt, action) {
      if (evt.keyCode === ESC_CODE) {
        action();
      }
    },
    isEnterEvent(evt, action) {
      if (evt.keyCode === ENTER_CODE) {
        action();
      }
    }
  };
})();


