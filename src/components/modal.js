export {openPopup, openImgPopup, handleEscKeyUp, closeModal, initPopupListeners}


const imgPopup = document.querySelector('.popup_type_image');
const popupCaption = document.querySelector('.popup__caption')
const photoPopup = document.querySelector('.popup__image');

function openPopup(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp)
};

function openImgPopup(link, name) {
  openPopup(imgPopup);
  photoPopup.src = link
  photoPopup.alt = name
  popupCaption.textContent = name
};

const handleEscKeyUp = (evt) => {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_is-opened");
    closeModal(popupOpen);
  }
};

const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', handleEscKeyUp);
};


const initPopupListeners = (popup) => {
  const cross = popup.querySelector('.popup__close')
  cross.addEventListener("click", () => {
    closeModal(popup)
  });
  
  popup.addEventListener('mousedown' , (evt) => {
    if (evt.target === popup) {
      closeModal(popup)
    }
  });
}