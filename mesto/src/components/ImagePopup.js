export default function ImagePopup(card) {
    return (
        <section className={`popup ${card.isOpen ? 'popup_opened' : ''} popup_type_view`}>
          <div className="popup__container-image">
            <button className="popup__close" type="button" onClick={card.onClose}></button>
            <img src={card.card.link} alt={card.card.name} className="popup__img" />
            <h2 className="popup__text">{card.card.name}</h2>
          </div>
        </section>
    )
}