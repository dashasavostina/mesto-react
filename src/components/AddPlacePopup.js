import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const cardName = React.useRef();
  const cardLink = React.useRef();

  React.useEffect(() => {
    cardName.current.value = "";
    cardLink.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: cardName.current.value,
      link: cardLink.current.value,
    });
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      name="add-form"
      children={
        <>
          <label className="popup__form-field">
            <input
              ref={cardName}
              id="title-input"
              type="text"
              name="title"
              className="popup__input popup__input_type_title"
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
            />
            <span className="title-input-error popup__input-error"></span>
          </label>
          <label className="popup__form-field">
            <input
              ref={cardLink}
              id="url-input"
              type="url"
              name="image"
              className="popup__input popup__input_type_image"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="url-input-error popup__input-error"></span>
          </label>
          <button className="popup__submit popup__submit_add" type="submit">
            Создать
          </button>
        </>
      }
    />
  );
}
