'use strict';
(() => {

  const NOT_FOUND = -1;

  const OfferTypeDict = {
    FLAT: `Квартира`,
    BUNGALOW: `Бунгало`,
    HOUSE: `Дом`,
    PALACE: `Дворец`
  };

  let popupCard = null;
  const mapFilterContainer = document.querySelector(`.map__filters-container`);

  const showFeatures = (ad, element) => {

    const removeIfNotFound = (features, searchValue, node) => {
      if (features.indexOf(searchValue) === NOT_FOUND) {
        node.remove();
      }
    };

    const popupFeatures = element.querySelector(`.popup__features`);

    const featureWifi = popupFeatures.querySelector(`.popup__feature--wifi`);
    removeIfNotFound(ad.offer.features, window.globals.Features.WIFI, featureWifi);

    const featureDishwasher = popupFeatures.querySelector(`.popup__feature--dishwasher`);
    removeIfNotFound(ad.offer.features, window.globals.Features.DISHWASHER, featureDishwasher);

    const featureParking = popupFeatures.querySelector(`.popup__feature--parking`);
    removeIfNotFound(ad.offer.features, window.globals.Features.PARKING, featureParking);

    const featureWasher = popupFeatures.querySelector(`.popup__feature--washer`);
    removeIfNotFound(ad.offer.features, window.globals.Features.WASHER, featureWasher);

    const featureElevator = popupFeatures.querySelector(`.popup__feature--elevator`);
    removeIfNotFound(ad.offer.features, window.globals.Features.ELEVATOR, featureElevator);

    const featureConditioner = popupFeatures.querySelector(`.popup__feature--conditioner`);
    removeIfNotFound(ad.offer.features, window.globals.Features.CONDITIONER, featureConditioner);
  };

  const showPhotos = (ad, element) => {

    const popupPhotos = element.querySelector(`.popup__photos`);
    let popupPhoto = popupPhotos.querySelector(`.popup__photo`);

    popupPhoto.remove();

    for (let i = 0; i < ad.offer.photos.length; i++) {
      let newPhoto = popupPhoto.cloneNode(false);
      newPhoto.src = ad.offer.photos[i];
      popupPhotos.appendChild(newPhoto);
    }
  };

  const showTitle = (ad, element) => {
    let popupTitle = element.querySelector(`.popup__title`);
    if (ad.offer.title !== ``) {
      popupTitle.innerText = ad.offer.title;
    } else {
      popupTitle.remove();
    }
  };

  const showTextAddress = (ad, element) => {
    let popupTextAddress = element.querySelector(`.popup__text--address`);
    popupTextAddress.innerText = ad.offer.address;
    if (ad.offer.address === ``) {
      popupTextAddress.remove();
    }
  };

  const showTextPrice = (ad, element) => {
    let popupTextPrice = element.querySelector(`.popup__text--price`);
    popupTextPrice.innerText = `${ad.offer.price}₽/ночь`;

    if (ad.offer.price === ``) {
      popupTextPrice.remove();
    }
  };

  const showPopupType = (ad, element) => {
    let popupType = element.querySelector(`.popup__type`);
    if (ad.offer.type !== ``) {
      popupType.innerText = OfferTypeDict[ad.offer.type.toString().toUpperCase()];
    } else {
      popupType.remove();
    }
  };

  const showPopupCapacity = (ad, element) => {
    let popupCapacity = element.querySelector(`.popup__text--capacity`);

    if ((ad.offer.rooms !== ``) && (ad.offer.guests !== ``)) {
      popupCapacity.innerText = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
    } else {
      popupCapacity.remove();
    }
  };

  const showPopupTextTime = (ad, element) => {
    let popupTextTime = element.querySelector(`.popup__text--time`);

    if ((ad.offer.checkin !== ``) && (ad.offer.checkout !== ``)) {
      popupTextTime.innerText = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
    } else {
      popupTextTime.remove();
    }
  };

  const showDescription = (ad, element) => {
    let popupDescription = element.querySelector(`.popup__description`);

    if (ad.offer.description !== ``) {
      popupDescription.innerText = ad.offer.description;
    } else {
      popupDescription.remove();
    }
  };

  const showAvatar = (ad, element) => {
    let popupAvatar = element.querySelector(`.popup__avatar`);

    if (ad.author.avatar !== ``) {
      popupAvatar.src = ad.author.avatar;
    } else {
      popupAvatar.remove();
    }
  };

  const renderAd = (template, ad) => {
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

  const makeFragment = (ad) => {
    const cardTemplate = document.querySelector(`#card`)
      .content
      .querySelector(`.popup`);

    const fragment = document.createDocumentFragment();
    fragment.appendChild(renderAd(cardTemplate, ad));

    return fragment;
  };

  const createCard = (pinData) => {
    const cardFragment = makeFragment(pinData);

    return mapFilterContainer.parentElement.appendChild(cardFragment);
  };

  const onPopupEscPress = (evt) => {
    window.eventUtils.isEscEventWithPreventDefault(evt, closeCard);
  };

  const setPopupListeners = () => {
    const popup = document.querySelector(`.popup`);
    document.addEventListener(`keydown`, onPopupEscPress);

    const popupClose = popup.querySelector(`.popup__close`);

    popupClose.addEventListener(`keydown`, (evt) => {
      window.eventUtils.isEnterEvent(evt, closeCard);
    });

    popupClose.addEventListener(`click`, () => {
      closeCard();
    });

  };

  const showCard = (obj) => {
    if (popupCard !== null) {
      closeCard();
    }

    popupCard = createCard(obj.data);
    window.mapPins.markActive(obj.element);
    setPopupListeners();
  };

  const closeCard = () => {
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
