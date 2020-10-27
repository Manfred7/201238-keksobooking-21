'use strict';
(function () {

  const NOT_FOUND = -1;
  let popupCard = null;
  const theMapFilterContainer = document.querySelector(`.map__filters-container`);

  const offerTypeDict = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  const showFeatures = function (ad, element) {
    let popupFeatures = element.querySelector(`.popup__features`);

    let featureWifi = popupFeatures.querySelector(`.popup__feature--wifi`);
    if (ad.offer.features.indexOf(`wifi`) === NOT_FOUND) {
      featureWifi.remove();
    }

    let featureDishwasher = popupFeatures.querySelector(`.popup__feature--dishwasher`);
    if (ad.offer.features.indexOf(`dishwasher`) === NOT_FOUND) {
      featureDishwasher.remove();
    }

    let featureParking = popupFeatures.querySelector(`.popup__feature--parking`);
    if (ad.offer.features.indexOf(`parking`) === NOT_FOUND) {
      featureParking.remove();
    }

    let featureWasher = popupFeatures.querySelector(`.popup__feature--washer`);
    if (ad.offer.features.indexOf(`washer`) === NOT_FOUND) {
      featureWasher.remove();
    }

    let featureElevator = popupFeatures.querySelector(`.popup__feature--elevator`);
    if (ad.offer.features.indexOf(`elevator`) === NOT_FOUND) {
      featureElevator.remove();
    }

    let featureConditioner = popupFeatures.querySelector(`.popup__feature--conditioner`);
    if (ad.offer.features.indexOf(`conditioner`) === NOT_FOUND) {
      featureConditioner.remove();
    }
  };

  const showPhotos = function (ad, element) {

    const popupPhotos = element.querySelector(`.popup__photos`);
    let popupPhoto = popupPhotos.querySelector(`.popup__photo`);

    popupPhoto.remove();

    for (let i = 0; i < ad.offer.photos.length; i++) {
      let newPhoto = popupPhoto.cloneNode(false);
      newPhoto.src = ad.offer.photos[i];
      popupPhotos.appendChild(newPhoto);
    }
  };

  const showTitle = function (ad, element) {
    let popupTitle = element.querySelector(`.popup__title`);
    if (ad.offer.title !== ``) {
      popupTitle.innerText = ad.offer.title;
    } else {
      popupTitle.remove();
    }
  };

  const showTextAddress = function (ad, element) {
    let popupTextAddress = element.querySelector(`.popup__text--address`);
    popupTextAddress.innerText = ad.offer.address;
    if (ad.offer.address === ``) {
      popupTextAddress.remove();
    }
  };

  const showTextPrice = function (ad, element) {
    let popupTextPrice = element.querySelector(`.popup__text--price`);
    popupTextPrice.innerText = `${ad.offer.price}₽/ночь`;

    if (ad.offer.price === ``) {
      popupTextPrice.remove();
    }
  };

  const showPopupType = function (ad, element) {
    let popupType = element.querySelector(`.popup__type`);
    if (ad.offer.type !== ``) {
      popupType.innerText = offerTypeDict[ad.offer.type];
    } else {
      popupType.remove();
    }
  };

  const showPopupCapacity = function (ad, element) {
    let popupCapacity = element.querySelector(`.popup__text--capacity`);

    if ((ad.offer.rooms !== ``) && (ad.offer.guests !== ``)) {
      popupCapacity.innerText = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
    } else {
      popupCapacity.remove();
    }
  };

  const showPopupTextTime = function (ad, element) {
    let popupTextTime = element.querySelector(`.popup__text--time`);

    if ((ad.offer.checkin !== ``) && (ad.offer.checkout !== ``)) {
      popupTextTime.innerText = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
    } else {
      popupTextTime.remove();
    }
  };

  const showDescription = function (ad, element) {
    let popupDescription = element.querySelector(`.popup__description`);

    if (ad.offer.description !== ``) {
      popupDescription.innerText = ad.offer.description;
    } else {
      popupDescription.remove();
    }
  };

  const showAvatar = function (ad, element) {
    let popupAvatar = element.querySelector(`.popup__avatar`);

    if (ad.author.avatar !== ``) {
      popupAvatar.src = ad.author.avatar;
    } else {
      popupAvatar.remove();
    }
  };

  const renderAd = function (template, ad) {
    let adElement = template.cloneNode(true);

    showTitle(ad, adElement);
    showTextAddress(ad, adElement);
    showTextPrice(ad, adElement);
    showPopupType(ad, adElement);
    showPopupCapacity(ad, adElement);
    showPopupTextTime(ad, adElement);
    showFeatures(ad, adElement);
    showDescription(ad, adElement);
    showPhotos(ad, adElement);
    showAvatar(ad, adElement);
    return adElement;
  };

  const makeFragment = function (ad) {
    const cardTemplate = document.querySelector(`#card`)
      .content
      .querySelector(`.popup`);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(renderAd(cardTemplate, ad));

    return fragment;
  };

  const createCard = function (pinData) {
    const cardFragment = makeFragment(pinData);
    return theMapFilterContainer.parentElement.appendChild(cardFragment);
  };

  const onPopupEscPress = function (evt) {
    if (evt.keyCode === window.eventUtils.ESC_CODE) {
      evt.preventDefault();
      closeCard();
    }
  };

  const setPopupListeners = function () {
    const popup = document.querySelector(`.popup`);
    document.addEventListener(`keydown`, onPopupEscPress);

    const popupClose = popup.querySelector(`.popup__close`);

    popupClose.addEventListener(`keydown`, function (evt) {
      window.eventUtils.isEnterEvent(evt, closeCard);
    });

    popupClose.addEventListener(`click`, function () {
      closeCard();
    });

  };


  const showCard = function (obj) {
    if (popupCard !== null) {
      closeCard();
    }

    popupCard = createCard(obj.data);
    window.mapPins.markActive(obj.element);
    setPopupListeners();
  };

  const closeCard = function () {
    const popup = document.querySelector(`.popup`);
    if (popup !== null) {
      popup.remove();
    }
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  window.card = {
    show: showCard,
    close: closeCard
  };

})();
