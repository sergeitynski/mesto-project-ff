import '../pages/index.css';
import {openPopup, handleEscKeyUp, closeModal, initPopupListeners} from './components/modal'
import {createCard, deleteCard, like} from './components/card'
import { getMeProfileServer, getCardsServer, deleteCardServer, editProfileServer, addCardServer, addLikeServer, deleteLikeServer, editAvatarServer } from './components/api'
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
  console.log(newCard)

  addCardServer(newCard)
      .then((newCard) => {
          gallery.prepend(createCard(newCard, deleteCard, like, openImgPopup));
          closeModal(addPopup);
          editPopup.reset()
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

const popapFormProfile = document.forms["edit-profile"];    
const popapFormAvatar = document.forms["new-avatar"];    
const profileImage = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup_type_new-avatar');  
const urlInputAvatar = document.querySelector('.popup__input_url_avatar'); 

function addAvatarSubmit(evt) {
  evt.preventDefault(); 
  changeButtonName(avatarPopup, 'Сохранение...')
  const newUrlAvatar = urlInputAvatar.value
  editAvatarServer(newUrlAvatar)
      .then((data) => {
          avatar.setAttribute('style', `background-image: url(${data.avatar})`);
          console.log(data)
          closePopup(avatarPopup);
          popapFormAvatar.reset()
      })
      .catch(errorResponse)
      .finally(() => {
          changeButtonName(avatarPopup, 'Сохранить')
      });
}

avatar.addEventListener('click', () => {
  popapFormAvatar.reset()
  openPopup(avatarPopup);
  clearValidation(popapFormAvatar)
})

popapFormAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addAvatarSubmit(evt)
})


enableValidation();



  Promise.all(promises)
    .then(([MeProfileServer, CardsServer]) => {
        nameTitle.textContent = MeProfileServer.name;   
        jobTitle.textContent = MeProfileServer.about;
        avatar.style.backgroundImage = `url("${MeProfileServer.avatar}")`;
        myId = MeProfileServer._id
        CardsServer.forEach((item) => {                        
            gallery.append(createCard(item, deleteCard, like, openImgPopup))
        })
    })
    .catch(errorResponse)

    export let myId = ''

    const errorResponse = (err) => {
      console.log(err);
  }