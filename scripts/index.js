const templateCard = document.querySelector('#card-template').content
const gallery = document.querySelector('.places__list')

initialCards.forEach((item) => {
  gallery.append(createCard(item.name, item.link));
});



function createCard(name, link){
  const card = templateCard.cloneNode(true);

  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = 'Фото с видом на ' + name;
  const delBtn = card.querySelector('.card__delete-button');
  delBtn.addEventListener('click', deleteCard);

  return card
};

function deleteCard(event) {
  event.target.closest('.card').remove();
}