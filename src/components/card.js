import { initialCards } from './cards.js';
export {createCard, initialCards, deleteCard, openPopup, openImgPopup, handleEscKeyUp, closeModal, listern}

const templateCard = document.querySelector('#card-template').content
const gallery = document.querySelector('.places__list')
const imgPopup = document.querySelector('.popup_type_image');
const popupCaption = document.querySelector('.popup__caption')
const photoPopup = document.querySelector('.popup__image');

initialCards.forEach((item) => {
  gallery.append(createCard(item.name, item.link));
});


function createCard(name, link){
  const card = templateCard.cloneNode(true);
  const delBtn = card.querySelector('.card__delete-button');
  const likeBtn = card.querySelector('.card__like-button');
  
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = 'Фото с видом на ' + name;

  delBtn.addEventListener('click', deleteCard);
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('card__like-button_is-active')
  });
  
  card.querySelector('.card__image').addEventListener('click', () => {openImgPopup(link, name)});

  return card
};

function deleteCard(event) {
  event.target.closest('.card').remove();
}


// добавление


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


// удаление popup

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


const listern = (popup) => {
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