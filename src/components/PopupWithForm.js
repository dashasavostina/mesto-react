import React from "react"

export default function PopupWithForm(props) {
  return (
    <section className={`popup ${props.isOpen ? 'popup_opened' : ''} popup_type_${props.name}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <h3 className={`popup__title ${props.title_type}`}>{props.title}</h3>
        <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
            {props.children}
        </form>
      </div>
    </section>
  )
}
