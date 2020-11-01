'use strict';
(function () {

  const showError = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };
  const disableArrayElements = function (array, disable) {
    for (let i = 0; i < array.length; i++) {
      array[i].disabled = disable;
    }
  };

  const getRandomInInterval = function (min, max) {
    let rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
  };

  const getRandomInt = function (max) {
    return Math.floor(Math.random() * (max));
  };

  const getRandomArrayElement = function (array) {
    return array[getRandomInt(array.length)];
  };


  const getRandomLengthArray = function (sourcArray) {
    let length = getRandomInt(sourcArray.length);
    let resultArr = [];

    for (let i = 0; i < length; i++) {
      resultArr.push(sourcArray[i]);
    }

    return resultArr;
  };

  window.utils = {
    onError: showError,
    disableArrayElements: disableArrayElements,
    getRandomInInterval: getRandomInInterval,
    getRandomInt: getRandomInt,
    getRandomArrayElement: getRandomArrayElement,
    getRandomLengthArray: getRandomLengthArray
  };

})();
