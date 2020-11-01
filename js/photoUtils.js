'use strict';

(function () {
  let FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  const createPreviewPhotoElemet = function () {
    const node = document.createElement(`div`);
    node.classList.add(`ad-form__photo__item`);

    const img = document.createElement(`img`);
    img.alt = `фото квартиры`;
    img.width = `70`;
    img.height = `70`;
    img.src = ``;
    node.appendChild(img);

    return {
      element: node,
      image: img
    };

  };

  const getPreviewPhotoElement = function (previewBox) {
    const node = document.querySelector(`.ad-form__photo__item`);

    if (node !== null) {
      return {
        element: node,
        image: node.querySelector(`img`)
      };

    } else {
      const newNode = createPreviewPhotoElemet();
      previewBox.appendChild(newNode.element);

      return newNode;
    }
  };

  const clearPhotoBox = function () {
    const node = document.querySelector(`.ad-form__photo__item`);
    if (node !== null) {
      node.remove();
    }
  };

  const checkFileExt = function (file) {
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    return matches;
  };

  const doLoad = function (file, preview) {
    const reader = new FileReader();
    reader.addEventListener(`load`, function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  const initFileChoiser = function (fileChooser, preview) {
    const onFileChouse = function () {
      const file = fileChooser.files[0];
      if (checkFileExt(file)) {
        doLoad(file, preview);
      }
    };

    fileChooser.addEventListener(`change`, onFileChouse);
  };

  const initPhotoChouser = function (fileChooser, previewBox) {

    const onPhotoChouse = function () {
      const file = fileChooser.files[0];
      if (checkFileExt(file)) {
        let node = getPreviewPhotoElement(previewBox);
        let preview = node.image;
        doLoad(file, preview);
      }
    };

    fileChooser.addEventListener(`change`, onPhotoChouse);
  };

  window.photoUtils = {
    clearPhotoBox,
    initPhotoChouser: initPhotoChouser,
    initFileChoiser: initFileChoiser
  };
})();
