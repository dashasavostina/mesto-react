import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      title_type="popup__title_avatar"
      name="avatar-add"
      children={
        <>
          <label className="popup__form-field">
            <input
              ref={avatarRef}
              id="avatar-input"
              type="url"
              name="avatar"
              className="popup__input popup__input_type_avatar"
              placeholder="Ссылка на аватар"
              required
            />
            <span className="avatar-input-error popup__input-error"></span>
          </label>
          <button className="popup__submit" type="submit">
            Сохранить
          </button>
        </>
      }
    />
  );
}
