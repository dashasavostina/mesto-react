import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { apiJoin } from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([ apiJoin.getUserData(), apiJoin.getInitialCards() ])
  .then(([ userData, cardObject ]) => {
    setCurrentUser(userData);
    setCards(cardObject);
  })
  .catch((err) => { console.log(`Возникла глобальная ошибка: ${err}`) })
  }, [])
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    apiJoin.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(`При лайке карточки возникла ошибка: ${err}`)
    })
}

  function handleCardDelete(card) {
    apiJoin.deleteCard(card._id)
    .then(() => {
      setCards((arrayOfCards) => 
        arrayOfCards.filter((item) => item._id !== card._id))
    })
    .catch((err) => {
      console.log(`Ошибка при удалении карточки: ${err}`)
    })
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard({
      ...selectedCard,
      name: card.name,
      link: card.link
    })
  }

  function handleConfirmClick() {
    setIsConfirmPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
   setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleUpdateUser(userData) {
    apiJoin.sendUserData(userData)
    .then((res) => {
    setCurrentUser(res);
    closeAllPopups();
    })
    .catch((err) => {
      console.log(`При редактировании профиля произошла ошибка: ${err}`)
    })
  }

  function handleUpdateAvatar(link) {
    apiJoin.sendAvatarData(link)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch(err => {
      console.log(`Ошибка обновления аватара: ${err}`)
   })
  }

  function handleAddPlaceSubmit(card) {
    apiJoin.addNewCard(card.name, card.link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`При добавлении новой карточки возникла ошибка: ${err}`)
    })
  }

    useEffect(() => {
      apiJoin.getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(`При рендере карточек произошла ошибка: ${err}`)
      })
    }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main 
        onEditAvatar = {handleEditAvatarClick}
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onCardClick = {handleCardClick}
        onCardLike = {handleCardLike}
        onCardDelete = {handleCardDelete}
        cards={cards}
        />
        <Footer />
      <EditAvatarPopup 
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
        onUpdateAvatar = {handleUpdateAvatar}
      />
      <EditProfilePopup 
      isOpen = {isEditProfilePopupOpen} 
      onClose = {closeAllPopups} 
      onUpdateUser = {handleUpdateUser}/>
      <AddPlacePopup 
      isOpen = {isAddPlacePopupOpen}
      onClose = {closeAllPopups}
      onAddPlace = {handleAddPlaceSubmit}
      />
      <ImagePopup
      isOpen = {isImagePopupOpen}
      onClose = {closeAllPopups}
      card = {selectedCard}
      />
      <PopupWithForm
        isOpen = {isConfirmPopupOpen}
        onClose = {closeAllPopups}
        title= 'Вы уверены?'
        name = 'confirm'
        children = {
          <button class="popup__submit popup__submit_confirm" type="submit">Да</button>
         }/>
      </div>
      </CurrentUserContext.Provider>
    )
      
}

export default App;
