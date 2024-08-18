import '../pages/index.css';
import {openPopup, openImgPopup, handleEscKeyUp, closeModal, initPopupListeners} from './components/modal'
import {initialCards} from './components/cards'
import {createCard, deleteCard, like} from './components/card'


const addCardBtn = document.querySelector('.profile__add-button')
const editBtn = document.querySelector('.profile__edit-button')
const addPopup = document.querySelector('.popup_type_new-card')
const editPopup = document.querySelector('.popup_type_edit')
const imgPopup = document.querySelector('.popup_type_image');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameTitle = document.querySelector('.profile__title');
const jobTitle = document.querySelector('.profile__description');
const gallery = document.querySelector('.places__list')
const nameAdd = document.querySelector('.popup__input_type_card-name');
const linkAdd = document.querySelector('.popup__input_type_url');


initialCards.forEach((item) => {
  gallery.append(createCard(item.name, item.link, deleteCard, like, openImgPopup));
});

addCardBtn.addEventListener('click', () => {openPopup(addPopup)});
editBtn.addEventListener('click', () => {
  openPopup(editPopup)
  nameInput.value = nameTitle.textContent
  jobInput.value = jobTitle.textContent
});

initPopupListeners(editPopup)
initPopupListeners(addPopup)
initPopupListeners(imgPopup)

editPopup.addEventListener('submit', handleEditProfile);
addPopup.addEventListener('submit', handleAddCard);

const handleEditProfile = (evt) => {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value
  jobTitle.textContent = jobInput.value
  const popup = evt.target.closest('.popup')
  
  closeModal(popup)
}


const handleAddCard = (evt) => {
  evt.preventDefault();
  const card = createCard(nameAdd.value, linkAdd.value, deleteCard, like, openImgPopup);
  gallery.prepend(card);
  const popup = evt.target.closest('.popup')
  closeModal(popup)
  nameAdd.value = ""
  linkAdd.value = ""
}

editPopup.addEventListener('submit', handleEditProfile);
addPopup.addEventListener('submit', handleAddCard);