'use strict';
(function () {

  const ADS_COUNT = 8;
  const PRICE_MIN = 100;
  const PRICE_MAX = 300;
  const ROOMS_MIN = 1;
  const ROOMS_MAX = 7;
  const GUESTS_MIN = 1;
  const GUESTS_MAX = 5;
  const LOCATION_Y_MIN = 130;
  const LOCATION_Y_MAX = 630;

  const CHECKIN_VARIANTS = [`12:00`, `13:00`, `14:00`];
  const CHECKOUT_VARIANTS = [`12:00`, `13:00`, `14:00`];
  const APPARTMENTS = [`palace`, `flat`, `house`, `bungalo`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  const getAuthor = function (idx) {
    return {"avatar": `img/avatars/user0${idx}.png`};
  };

  const getOffer = function (Location) {
    return {
      "title": `строка, заголовок предложения`,
      "address": `${Location.x}, ${Location.y}`,
      "price": window.utils.getRandomInInterval(PRICE_MIN, PRICE_MAX), //  число, стоимость
      "type": window.utils.getRandomArrayElement(APPARTMENTS),
      "rooms": window.utils.getRandomInInterval(ROOMS_MIN, ROOMS_MAX),
      "guests": window.utils.getRandomInInterval(GUESTS_MIN, GUESTS_MAX),
      "checkin": window.utils.getRandomArrayElement(CHECKIN_VARIANTS),
      "checkout": window.utils.getRandomArrayElement(CHECKOUT_VARIANTS),
      "features": window.utils.getRandomLengthArray(FEATURES),
      "description": `строка с описанием`,
      "photos": window.utils.getRandomLengthArray(PHOTOS),
    };
  };

  const createFakeAd = function (idx) {
    const tmpaAthor = getAuthor(idx);

    const tmpLocation = {
      "x": window.utils.getRandomInInterval(0, window.globals.MAX_WIDTH), // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      "y": window.utils.getRandomInInterval(LOCATION_Y_MIN, LOCATION_Y_MAX) // случайное число, координата y метки на карте от 130 до 630.
    };
    const tmpOffer = getOffer(tmpLocation);

    const tmpAd = {
      "author": tmpaAthor,
      "offer": tmpOffer,
      "location": tmpLocation
    };

    return tmpAd;
  };

  const makeFakeAds = function () {
    let tmpAds = [];
    for (let i = 1; i <= ADS_COUNT; i++) {
      let tmpAd = createFakeAd(i);
      tmpAds.push(tmpAd);
    }
    return tmpAds;
  };

  window.data = {
    generate: makeFakeAds
  };

})();
