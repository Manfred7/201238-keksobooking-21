'use strict';
(function () {

  const StatusCode = {
    OK: 200
  };

  const TIMEOUT_IN_MS = 10000;
  const RESPONSE_TYPE = `json`;
  const URL = `https://21.javascript.pages.academy/keksobooking`;

  const getNewXHR = function (onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    return xhr;
  };

  const uploadToServer = function (data, onSuccess, onError) {
    const xhr = getNewXHR(onSuccess, onError);
    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  const loadFromServer = function (onSuccess, onError) {
    const dataURL = URL + `/data`;
    const xhr = getNewXHR(onSuccess, onError);
    xhr.open(`GET`, dataURL);
    xhr.send();
  };

  window.backend = {
    load: loadFromServer,
    save: uploadToServer
  };
})();
