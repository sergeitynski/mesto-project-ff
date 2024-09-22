import {deleteCardServer, addLikeServer, deleteLikeServer} from './api'
import { myId, errorResponse } from '../index';
export {createCard, deleteCard, like}

const templateCard = document.querySelector('#card-template').content

function createCard(obj, deleteCardCallBack, likeCallBack, openImgPopupCallBack){ //deleteCardCallBack, likeCallBack, openImgPopupCallBack
  const card = templateCard.querySelector('.places__item').cloneNode(true);
  const delBtn = card.querySelector('.card__delete-button');
  const likeBtn = card.querySelector('.card__like-button');
  const likeCount = card.querySelector('.card__like-count');
  const cardsImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  
  cardTitle.textContent = obj.name;
  cardsImage.src = obj.link;
  cardsImage.alt = 'Фото с видом на ' + obj.name;
  likeCount.textContent = obj.likes.length;

  card.dataset.cardId = obj._id;                                

  if (obj.owner._id !== myId) {                 
      delBtn.remove()
  }

  delBtn.addEventListener('click', (evt) => {
      deleteCardServer(card.dataset.cardId)
          .then(() => deleteCardCallBack(evt))
          .catch(errorResponse)
  })

  
  const checkLikeCard = obj.likes.some((like) => {
      return like._id.includes(myId)
  })
  if (checkLikeCard) {
    likeBtn.classList.add('card__like-button_is-active')
  }

  likeBtn.addEventListener('click', (likeBtn) => {
    console.log(likeBtn)
    likeCallBack(likeBtn, likeCount);
  })

  cardsImage.addEventListener('click', () => {
    openImgPopupCallBack(cardsImage.alt, cardsImage.src)
  })

  return card;
};

function deleteCard(evt) {
  const eventTarget = evt.target;                          
  const closestParentCard = eventTarget.closest('.places__item');
  closestParentCard.remove();          
}

function like(likeBtn, likeCount) {
  const card = likeBtn.target.closest('.card');

  if (!likeBtn.target.classList.contains('card__like-button_is-active')) {
    addLikeServer(card.dataset.cardId)
          .then((data) => {
              likeCount.textContent = data.likes.length;
              likeBtn.target.classList.add('card__like-button_is-active');
          })
          .catch(errorResponse)
  }
  else {
      deleteLikeServer(card.dataset.cardId)
          .then((data) => {
              likeCount.textContent = data.likes.length;
              likeBtn.target.classList.remove('card__like-button_is-active');
          })
          .catch(errorResponse)
  }
}