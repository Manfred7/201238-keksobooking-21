'use strict';
(() => {
  let FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  const createPreviewPhotoElement = () => {
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

  const getPreviewPhotoElement = (previewBox) => {
    const node = document.querySelector(`.ad-form__photo__item`);

    if (node !== null) {
      return {
        element: node,
        image: node.querySelector(`img`)
      };

    } else {
      const newNode = createPreviewPhotoElement();
      previewBox.appendChild(newNode.element);

      return newNode;
    }
  };

  const clearPhotoBox = () => {
    const node = document.querySelector(`.ad-form__photo__item`);
    if (node !== null) {
      node.remove();
    }
  };

  const checkFileExt = (file) => {
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    return matches;
  };

  const doLoad = (file, preview) => {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  const initFileChoiser = (fileChooser, preview) => {
    const onFileChouse = () => {
      const file = fileChooser.files[0];
      if (checkFileExt(file)) {
        doLoad(file, preview);
      }
    };

    fileChooser.addEventListener(`change`, onFileChouse);
  };

  const initPhotoChouser = (fileChooser, previewBox) => {

    const onPhotoChouse = () => {
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
