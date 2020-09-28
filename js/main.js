'use strict';

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
const APPARTMENTS = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const theMapPins = document.querySelector(`.map__pins`);
const MAX_WIDTH = theMapPins.clientWidth;
const DELTA_X = document.querySelector(`.map__pin--main`).offsetWidth;
const DELTA_Y = document.querySelector(`.map__pin--main`).offsetHeight;

// генерирует случайное целое (integer) число от min до max (включительно).
const getRandomInInterval = function (min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// случайное число в интервале от 0 до max (не включительно)
const getRandomInt = function (max) {
  return Math.floor(Math.random() * (max));
};

// возвращает случайный элемент массива
const getRandomArrayElement = function (array) {
  return array[getRandomInt(array.length)];
};

// генерим автора
const getAuthor = function (idx) {
  return {"avatar": `img/avatars/user0${idx}.png`};
};

// генерим массив случайной длины, за основу берется  передаваемый внутрь, длина не больше длины переданного
const getRandomLengthArray = function (sourcArray) {
  let length = getRandomInt(sourcArray.length);
  let resultArr = [];

  for (let i = 0; i < length; i++) {
    resultArr.push(sourcArray[i]);
  }
  return resultArr;
};

// генерим объект Offer
const getOffer = function (Location) {
  return {
    "title": `строка, заголовок предложения`,
    "address": `${Location.x}, ${Location.y}`,
    "price": getRandomInInterval(PRICE_MIN, PRICE_MAX), //  число, стоимость
    "type": getRandomArrayElement(APPARTMENTS),
    "rooms": getRandomInInterval(ROOMS_MIN, ROOMS_MAX),
    "guests": getRandomInInterval(GUESTS_MIN, GUESTS_MAX),
    "checkin": getRandomArrayElement(CHECKIN_VARIANTS),
    "checkout": getRandomArrayElement(CHECKOUT_VARIANTS),
    "features": getRandomLengthArray(FEATURES),
    "description": `строка с описанием`,
    "photos": getRandomLengthArray(PHOTOS),
  };
};

// создаем объект с фековыми данными
const createFakeAd = function (idx) {
  let tmpaAthor = getAuthor(idx);

  let tmpLocation = {
    "x": getRandomInInterval(0, MAX_WIDTH), // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
    "y": getRandomInInterval(LOCATION_Y_MIN, LOCATION_Y_MAX) // случайное число, координата y метки на карте от 130 до 630.
  };
  let tmpOffer = getOffer(tmpLocation);

  let tmpAd = {
    "author": tmpaAthor,
    "offer": tmpOffer,
    "location": tmpLocation
  };
  return tmpAd;
};

// создаем массив оюъектов с фейковыми данными
const makeFakeAds = function () {
  let tmpAds = [];
  for (let i = 1; i <= ADS_COUNT; i++) {
    let tmpAd = createFakeAd(i);
    tmpAds.push(tmpAd);
  }
  return tmpAds;
};

// создаем ноду с пином и переносим в нее данные из объекта
const renderAd = function (template, adObj) {
  let adElement = template.cloneNode(true);
  let img = adElement.querySelector(`img`);

  img.src = adObj.author.avatar;
  img.alt = adObj.offer.title;

  adElement.style.left = `${adObj.location.x + DELTA_X}px`;
  adElement.style.top = `${adObj.location.y + DELTA_Y}px`;

  return adElement;
};

// cоздаем фрагмент из 8 нод с пинами
const makeFragment = function (ads) {
  const pinTemplate = document.querySelector(`#pin`) // берем разметку для метки из шаблона
    .content
    .querySelector(`.map__pin`);

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < ads.length; i++) {
    fragment.appendChild(renderAd(pinTemplate, ads[i]));
  }
  return fragment;
};

const theMap = document.querySelector(`.map`);
theMap.classList.remove(`map--faded`);

const ads = makeFakeAds(); // генерим тестовые данные
theMapPins.appendChild(makeFragment(ads)); // сгенерим и добамим сгенеренный фрагмент

