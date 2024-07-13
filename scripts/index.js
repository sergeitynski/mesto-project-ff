const tempCard = document.querySelector('#card-template').content
const gallery = document.querySelector('.places__list')

initialCards.forEach((item, delcard) => {
  gallery.append(addCard(item.name, item.link, delcard));
});



function addCard(name, link){
  const card = tempCard.cloneNode(true);

  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__image').src = link;
  const delBtn = card.querySelector('.card__delete-button');
  delBtn.addEventListener('click', delcard);

  return card
};

function delcard(event) {
  event.target.closest('.card').remove();
}