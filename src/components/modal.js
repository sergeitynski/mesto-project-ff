export {handleFormSubmit, handleAddCard};
import {createCard, closeModal} from './card';

const gallery = document.querySelector('.places__list')
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameTitle = document.querySelector('.profile__title');
const jobTitle = document.querySelector('.profile__description');
const nameAdd = document.querySelector('.popup__input_type_card-name');
const linkAdd = document.querySelector('.popup__input_type_url');

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value
  jobTitle.textContent = jobInput.value
  const popup = evt.target.closest('.popup')
  closeModal(popup)
}


const handleAddCard = (evt) => {
  evt.preventDefault();
  const card = createCard(nameAdd.value, linkAdd.value);
  gallery.append(card);
  const popup = evt.target.closest('.popup')
  closeModal(popup)
  nameAdd.value = ""
  linkAdd.value = ""
}