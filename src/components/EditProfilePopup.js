import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen])

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  

  function handleChangeName(e) {
   setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
   }

   function handleSubmit(e) {
     e.preventDefault();
     props.onUpdateUser({
       name: name,
       job: description,
    })
   }

    return(
        <PopupWithForm
            isOpen = {props.isOpen}
            onClose = {props.onClose}
            onSubmit={handleSubmit}
            title= 'Редактировать профиль'
            title_type = 'popup__title-edit'
            name = 'edit'
            children = {
             <><label className="popup__form-field">
              <input 
              value={name || ""}
              onChange={handleChangeName}
              id="name-input" 
              type="text" 
              name="name" 
              className="popup__input popup__input_type_name" 
              placeholder="Имя" 
              required 
              minLength="2" 
              maxLength="40"/>
              <span className="name-input-error popup__input-error"></span>
            </label>
            <label class="popup__form-field">
              <input 
              value={description || ""}
              onChange={handleChangeDescription}
              id="job-input" 
              type="text" 
              name="job" 
              className="popup__input popup__input_type_job" 
              placeholder="О себе" 
              required 
              minLength="2" 
              maxLength="40"/>
              <span className="job-input-error popup__input-error"></span>
            </label>
            <button onSubmit={handleSubmit} className="popup__submit" type="submit">Сохранить</button></>
            }
           />
    )
}
