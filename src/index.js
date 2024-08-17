import '../pages/index.css';
import {openPopup, listern} from './components/card';
import {handleFormSubmit, handleAddCard} from './components/modal';


const addCardBtn = document.querySelector('.profile__add-button')
const editBtn = document.querySelector('.profile__edit-button')
const addPopup = document.querySelector('.popup_type_new-card')
const editPopup = document.querySelector('.popup_type_edit')
const imgPopup = document.querySelector('.popup_type_image');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameTitle = document.querySelector('.profile__title');
const jobTitle = document.querySelector('.profile__description');


addCardBtn.addEventListener('click', () => {openPopup(addPopup)});
editBtn.addEventListener('click', () => {
  openPopup(editPopup)
  nameInput.value = nameTitle.textContent
  jobInput.value = jobTitle.textContent
});

// удаление popuplistern(editPopup)
listern(editPopup)
listern(addPopup)
listern(imgPopup)

// Форма редактирования
editPopup.addEventListener('submit', handleFormSubmit);
addPopup.addEventListener('submit', handleAddCard);