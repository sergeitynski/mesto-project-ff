export { getMeProfileServer, getCardsServer, deleteCardServer, editProfileServer, addCardServer, addLikeServer, deleteLikeServer, editAvatarServer }

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
  headers: {
      authorization: '7b174ce4-dcea-459f-9274-f5248030cde3',
      'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Какое тебе програмирование у тебя вон: ${res.status}`)
}

function getMeProfileServer() {
  return fetch(`${config.baseUrl}/users/me`, {   // о пользователе
      headers: config.headers
  })
      .then(handleResponse)
}


function getCardsServer() {
  return fetch(`${config.baseUrl}/cards`, {  // карточки с сервера
      headers: config.headers
  })
      .then(handleResponse)

}

function deleteCardServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'Delete',
      headers: config.headers
  })
      .then(handleResponse)
}


function editProfileServer(profileTitle, profileDescription) {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          name: profileTitle.textContent,
          about: profileDescription.textContent,
      })
  })
      .then(handleResponse)
}


function editAvatarServer(newUrlAvatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          avatar: newUrlAvatar
      })
  })
      .then(handleResponse)
}


function addCardServer(newCard) {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
          name: newCard.name,
          link: newCard.link,
          likes: newCard.likes,
      })
  })
      .then(handleResponse)
}


function addLikeServer(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
  })
      .then(handleResponse)
}


function deleteLikeServer(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'Delete',
      headers: config.headers
  })
      .then(handleResponse)
}