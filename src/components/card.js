export {createCard, deleteCard, like}

const templateCard = document.querySelector('#card-template').content

function createCard(name, link, deleteCardCallBack, likeCallBack, openImgPopupCallBack){
  const card = templateCard.cloneNode(true);
  const delBtn = card.querySelector('.card__delete-button');
  const likeBtn = card.querySelector('.card__like-button');
  
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = 'Фото с видом на ' + name;

  delBtn.addEventListener('click', deleteCardCallBack);
  likeBtn.addEventListener('click', likeCallBack);
  
  card.querySelector('.card__image').addEventListener('click', () => {openImgPopupCallBack(link, name)});

  return card
};

function deleteCard(event) {
  event.target.closest('.card').remove();
}

function like(event) {
  event.target.classList.toggle('card__like-button_is-active')
}