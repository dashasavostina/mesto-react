import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  //подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      {" "}
      <main className="content">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__avatar">
              <img
                src={`${currentUser.avatar}`}
                alt="аватар профиля"
                className="profile__avatar-img"
              />
              <button
                className="profile__avatar-edit"
                type="button"
                onClick={props.onEditAvatar}
              />
            </div>
            <div className="profile__group">
              <div className="profile__text">
                <h1 className="profile__title">{currentUser.name}</h1>
                <p className="profile__subtitle">{currentUser.about}</p>
              </div>
              <button
                className="profile__edit-button"
                type="button"
                onClick={props.onEditProfile}
              />
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={props.onAddPlace}
          />
        </section>
        <section className="elements">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardDelete={props.onCardDelete}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
            />
          ))}
        </section>
      </main>{" "}
    </>
  );
}
