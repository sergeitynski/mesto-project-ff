import '../pages/index.css';
import {openPopup, closeModal, initPopupListeners} from './components/modal'
import {createCard, deleteCard, like} from './components/card'
import { getMeProfileServer, getCardsServer,editProfileServer, addCardServer, editAvatarServer } from './components/api'
import { enableValidation, clearValidation } from './components/validation';


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
const popupCaption = document.querySelector('.popup__caption')
const photoPopup = document.querySelector('.popup__image');
const avatar = document.querySelector('.profile__image'); 
const popapForm = document.forms["new-place"];

const popapFormProfile = document.forms["edit-profile"];    
const popapFormAvatar = document.forms["new-avatar"];    
const popapContent = document.querySelector('.popup__content');
const avatarPopup = document.querySelector('.popup_type_new-avatar');  
const urlInputAvatar = document.querySelector('.popup__input_url_avatar');
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const newCard = {};
const promises = [getMeProfileServer(), getCardsServer()]

function changeButtonName(popup, name) {
  popup.querySelector('.popup__button').textContent = name;
}

function handleAddCard(evt) {
  evt.preventDefault(); 
  changeButtonName(addPopup, 'Сохранение...')
  newCard.name = nameAdd.value;
  newCard.link = linkAdd.value;
  newCard.likes = '';

  addCardServer(newCard)
      .then((newCard) => {
          gallery.prepend(createCard(newCard, deleteCard, like, openImgPopup));
          popapForm.reset()
          closeModal(addPopup);
      })
      .catch(errorResponse)
      .finally(() => {
          changeButtonName(addPopup, 'Сохранить')
      });
}

addPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleAddCard(evt)
})

addCardBtn.addEventListener('click', () => {
  openPopup(addPopup)
});



const handleEditProfile = (evt) => {
  evt.preventDefault(); 
  changeButtonName(editPopup, 'Сохранение...')
  nameTitle.textContent = nameInput.value;
  jobTitle.textContent = jobInput.value;
  editProfileServer(nameTitle, jobTitle)
      .then(() => {
        clearValidation(editPopup, config)
        closeModal(editPopup)
      })
      .catch(errorResponse)
      .finally(() => {
          changeButtonName(editPopup, 'Сохранить')
      });
}

editPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleEditProfile(evt)
})

editBtn.addEventListener('click', () => {
  openPopup(editPopup)
  nameInput.value = nameTitle.textContent
  jobInput.value = jobTitle.textContent
  clearValidation(editPopup, config)
});


function openImgPopup(name, link) {
  openPopup(imgPopup);
  photoPopup.src = link
  photoPopup.alt = name
  popupCaption.textContent = name
};

initPopupListeners(editPopup)
initPopupListeners(addPopup)
initPopupListeners(imgPopup)

function addAvatarSubmit(evt) {
  evt.preventDefault(); 
  changeButtonName(avatarPopup, 'Сохранение...')
  const newUrlAvatar = urlInputAvatar.value
  editAvatarServer(newUrlAvatar)   
      .then((data) => {
          avatar.setAttribute('style', `background-image: url(${data.avatar})`)
          popapFormAvatar.reset()
          closeModal(avatarPopup)
      })
      .catch(errorResponse)
      .finally(() => {
          changeButtonName(avatarPopup, 'Сохранить')
      });
}

avatar.addEventListener('click', () => {
  popapFormAvatar.reset()
  openPopup(avatarPopup);
  clearValidation(popapFormAvatar, config)
})

popapFormAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addAvatarSubmit(evt)
  closeModal(avatarPopup)
})

enableValidation(config);

  Promise.all(promises)
    .then(([meProfileServer, cardsServer]) => {
        nameTitle.textContent = meProfileServer.name;   
        jobTitle.textContent = meProfileServer.about;
        avatar.style.backgroundImage = `url("${meProfileServer.avatar}")`;
        myId = meProfileServer._id
        cardsServer.forEach((item) => {                        
            gallery.append(createCard(item, deleteCard, like, openImgPopup))
        })
    })
    .catch(errorResponse)

    export let myId = ''

    export const errorResponse = (err) => {
      console.log(err);
  }