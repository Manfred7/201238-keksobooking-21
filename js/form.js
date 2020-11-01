'use strict';
(function () {

  const TITLE_MIN_LENGTH = 30;
  const TITLE_MAX_LENGTH = 30;
  const DEFAULT_MIN_PRICE = 0;
  const BUNGALO_MIN_PRICE = DEFAULT_MIN_PRICE;
  const FLAT_MIN_PRICE = 1000;
  const HOUSE_MIN_PRICE = 5000;
  const PALACE_MIN_PRICE = 10000;
  const MAX_PRICE = 1000000;
  const AVATAR_DEFAULT_IMAGE = `img/muffin-grey.svg`;

  const mapPinMain = document.querySelector(`.map__pin--main`);
  const DELTA_X = mapPinMain.offsetWidth / 2;
  const DELTA_Y = mapPinMain.offsetHeight;

  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);

  const avatarfileChooser = document.querySelector(`.ad-form__field input[type=file]`);
  const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
  window.photoUtils.initFileChoiser(avatarfileChooser, avatarPreview);

  const photofileChooser = document.querySelector(`.ad-form__upload input[type=file]`);
  const photoPreviewBox = document.querySelector(`.ad-form__photo`);

  window.photoUtils.initPhotoChouser(photofileChooser, photoPreviewBox);

  const addressControl = document.querySelector(`#address`);

  const setAddresCoord = function (x, y) {
    addressControl.value = `${x},${y}`;
  };

  const setInnactiveCoord = function () {
    const mapPinCenterX = mapPinMain.offsetLeft + DELTA_X;
    const mapPinCenterY = mapPinMain.offsetTop + Math.floor(DELTA_Y / 2);
    setAddresCoord(mapPinCenterX, mapPinCenterY);
  };

  const address = {
    setInnactiveState() {
      setInnactiveCoord();
      addressControl.disabled = true;
      addressControl.placeholder = addressControl.value;
    },
    update() {
      const mapPinX = mapPinMain.offsetLeft + DELTA_X;
      const mapPinY = mapPinMain.offsetTop - DELTA_Y;
      setAddresCoord(mapPinX, mapPinY);
    },
    setActveState() {
      this.update();
    }
  };

  const type = document.querySelector(`#type`);
  const title = document.querySelector(`#title`);
  title.setAttribute(`minlength`, TITLE_MIN_LENGTH);
  title.setAttribute(`maxlength`, TITLE_MAX_LENGTH);
  title.setAttribute(`required`, ``);

  const price = document.querySelector(`#price`);
  price.setAttribute(`required`, ``);
  price.setAttribute(`max`, MAX_PRICE);


  const setPriceMinLimit = function () {
    switch (type.value) {
      case `bungalow`:
        price.setAttribute(`min`, BUNGALO_MIN_PRICE);
        price.setAttribute(`placeholder`, BUNGALO_MIN_PRICE);
        break;
      case `flat`:
        price.setAttribute(`min`, FLAT_MIN_PRICE);
        price.setAttribute(`placeholder`, FLAT_MIN_PRICE);
        break;
      case `house`:
        price.setAttribute(`min`, HOUSE_MIN_PRICE);
        price.setAttribute(`placeholder`, HOUSE_MIN_PRICE);
        break;
      case `palace`:
        price.setAttribute(`min`, PALACE_MIN_PRICE);
        price.setAttribute(`placeholder`, PALACE_MIN_PRICE);
        break;

      default:
        price.setAttribute(`min`, DEFAULT_MIN_PRICE);
        price.setAttribute(`placeholder`, DEFAULT_MIN_PRICE);
    }

  };

  setPriceMinLimit();

  type.addEventListener(`change`, function () {
    setPriceMinLimit();
  });

  const timein = document.querySelector(`#timein`);
  const timeout = document.querySelector(`#timeout`);
  timein.addEventListener(`change`, function () {
    timeout.selectedIndex = timein.selectedIndex;
  });

  timeout.addEventListener(`change`, function () {
    timein.selectedIndex = timeout.selectedIndex;
  });

  const roomNumber = document.querySelector(`#room_number`);
  const capacity = document.querySelector(`#capacity`);


  const validateRoomsGestAccordance = function (evt) {
    let validityMessage = ``;

    switch (roomNumber.value) {
      case `1`:
        if (capacity.value !== `1`) {
          validityMessage = `1 комната для 1 гостя!`;
        }
        break;
      case `2`:
        if (!((capacity.value === `1`) || (capacity.value === `2`))) {
          validityMessage = `2 комнаты для 2 гостей или для 1 гостя!`;
        }
        break;
      case `3`:
        if (!((capacity.value === `1`) || (capacity.value === `2`) || (capacity.value === `3`))) {
          validityMessage = `3 комнаты для 3 гостей, для 2 гостей или для 1 гостя!`;
        }
        break;
      case `100`:
        if (capacity.value !== `0`) {
          validityMessage = `100 комнат не для гостей!`;
        }
        break;

      default:
        validityMessage = `Выбрано не подержиаемое количество комнат!`;
    }

    evt.target.setCustomValidity(validityMessage);
    evt.target.reportValidity();
  };

  capacity.addEventListener(`change`, validateRoomsGestAccordance);
  roomNumber.addEventListener(`change`, validateRoomsGestAccordance);

  const setDefaultAvatar = function () {
    avatarPreview.src = AVATAR_DEFAULT_IMAGE;
  };

  const setInnactive = function () {
    window.utils.disableArrayElements(adFormFieldsets, true);
    adForm.classList.add(`ad-form--disabled`);
    address.setInnactiveState();

    adForm.reset();
    window.photoUtils.clearPhotoBox();
    setDefaultAvatar();
  };

  const setActive = function () {
    adForm.classList.remove(`ad-form--disabled`);
    window.utils.disableArrayElements(adFormFieldsets, false);
    capacity.selectedIndex = 2;
    address.setActveState();
  };

  const initCloseMessage = function (element) {
    let removeListeners = null;

    const closeMsg = function () {
      element.remove();
      removeListeners();
    };

    const onBodyClick = function () {
      closeMsg();
    };

    document.body.addEventListener(`click`, onBodyClick);

    const onPopupEscPress = function (evt) {
      window.eventUtils.isEscEventWithPreventDefault(evt, closeMsg);
    };

    document.body.addEventListener(`keydown`, onPopupEscPress);

    const errorButton = element.querySelector(`.error__button`);

    if (errorButton !== null) {
      errorButton.addEventListener(`click`, onBodyClick);
    }

    removeListeners = function () {
      document.body.removeEventListener(`click`, onBodyClick);
      document.body.removeEventListener(`keydown`, onPopupEscPress);
    };

  };
  const showSuccesMsg = function () {
    const template = document.querySelector(`#success `)
      .content
      .querySelector(`.success`);

    const element = template.cloneNode(true);
    const theMap = document.querySelector(`.map`);
    theMap.appendChild(element);

    initCloseMessage(element);
  };

  const onSucces = function () {
    window.map.setInnactive();
    showSuccesMsg();
  };

  const showErrorMsg = function (errorMessage) {
    const template = document.querySelector(`#error `)
      .content
      .querySelector(`.error`);

    const element = template.cloneNode(true);
    const msg = element.querySelector(`.error__message`);
    msg.textContent = errorMessage;

    const main = document.querySelector(`main`);
    main.insertAdjacentElement(`afterbegin`, element);

    initCloseMessage(element);
  };

  const onError = function (errorMessage) {
    showErrorMsg(errorMessage);
  };


  const submitHandler = function (evt) {
    let data = new FormData(adForm);
    data.append(`address`, addressControl.value);
    window.backendAPI.save(data, onSucces, onError);
    evt.preventDefault();
  };
  adForm.addEventListener(`submit`, submitHandler);

  const resetButton = adForm.querySelector(`.ad-form__reset`);

  const resetHandler = function (evt) {
    window.map.setInnactive();
    evt.preventDefault();
  };

  resetButton.addEventListener(`click`, resetHandler);

  window.form = {
    setInnactiveState: setInnactive,
    setActiveState: setActive,
    updateAddresCoord: address.update
  };

})();
