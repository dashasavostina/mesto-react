import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
      } 

    function handleLikeClick() {
      props.onCardLike(props.card);
    }

    function handleDeleteClick() {
      props.onCardDelete(props.card);
    }
      
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
      `card__heart ${isLiked && 'card__heart_active'}` 
    );

    return (
      <div className="elements-template">
        <div className="card">
          <img className="card__photo" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            {isOwn && <button className="card__trash" type="button" onClick={handleDeleteClick}/>}  
            <div className="card__group">
              <h2 className="card__title">{props.card.name}</h2>
              <div className="card__heart-area">
                <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"/>
                <p className="card__heart-counter">{props.card.likes.length}</p>
              </div>
            </div>
        </div> 
      </div>
    )
  }