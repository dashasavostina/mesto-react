import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { useState } from 'react';
import PopupWithForm from './PopupWithForm';



function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard({
      ...selectedCard,
      name: card.name,
      link: card.link
    })
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

  return (
      <body className="page">
        <Header />
        <Main 
        onEditAvatar = {handleEditAvatarClick}
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onCardClick = {handleCardClick}
        />
        <Footer />
        <PopupWithForm
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
        title= 'Обновить аватар'
        title_type = 'popup__title_avatar'
        name = 'avatar-add'
        children = {
          <><label className="popup__form-field">
            <input id="avatar-input" type="url" name="avatar" className="popup__input popup__input_type_avatar" placeholder="Ссылка на аватар" required />
            <span className="avatar-input-error popup__input-error"></span>
          </label><button className="popup__submit" type="submit">Сохранить</button></>
         }
       />
        <PopupWithForm
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
        title= 'Редактировать профиль'
        title_type = 'popup__title-edit'
        name = 'edit'
        children = {
         <><label className="popup__form-field">
          <input id="name-input" type="text" name="name" className="popup__input popup__input_type_name" placeholder="Имя" required minLength="2" maxLength="40"/>
          <span className="name-input-error popup__input-error"></span>
        </label>
        <label class="popup__form-field">
          <input id="job-input" type="text" name="job" className="popup__input popup__input_type_job" placeholder="О себе" required minLength="2" maxLength="40"/>
          <span className="job-input-error popup__input-error"></span>
        </label>
        <button className="popup__submit" type="submit">Сохранить</button></>
        }
       />
       <PopupWithForm
       isOpen = {isAddPlacePopupOpen}
       onClose = {closeAllPopups}
       title= 'Новое место'
       name = 'add-form'
       children = {
         <><label className="popup__form-field">
         <input id="title-input" type="text" name="title" className="popup__input popup__input_type_title" placeholder="Название" required minLength="2" maxLength="30" />
         <span className="title-input-error popup__input-error"></span>
       </label>
       <label class="popup__form-field">
         <input id="url-input" type="url" name="image" className="popup__input popup__input_type_image" placeholder="Ссылка на картинку" required />
         <span className="url-input-error popup__input-error"></span>
       </label>
       <button className="popup__submit popup__submit_add" type="submit">Создать</button></>
        }
       />
      <ImagePopup
      isOpen = {isImagePopupOpen}
      onClose = {closeAllPopups}
      card = {selectedCard}
      />
      </body>)
}

export default App;
