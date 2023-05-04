import { useEffect, useState } from 'react';
import profile__avatar from '../images/profile__avatar.jpg';
import { apiJoin } from '../utils/api';
import Card from './Card';

export default function Main(props) {
    const [userName, setUserName] = useState('Жак-Ив Кусто');
    const [userDescription, setUserDescription] = useState('Исследователь океана');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
       apiJoin.getUserData()
       .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
       })
       .catch((err) => {
        console.log(`При редактировании профиля произошла ошибка: ${err}`)
      })
      apiJoin.getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch((err) => {
        console.log(`При рендере карточек произошла ошибка: ${err}`)
      })
    }, [])

    return (
      <> <main className="content">
          <section className="profile">
            <div className="profile__info">
              <div className="profile__avatar">
              <img src={`${userAvatar}`} alt="аватар профиля" className="profile__avatar-img"/>
              <button className="profile__avatar-edit" type="button" onClick={props.onEditAvatar}/>
            </div>
              <div className="profile__group">
                <div className="profile__text">
                  <h1 className="profile__title" >{userName}</h1>
                  <p className="profile__subtitle" >{userDescription}</p>
                </div> 
                <button className="profile__edit-button" type="button" onClick={props.onEditProfile}/>
              </div>
            </div>
            <button className="profile__add-button" type="button" onClick={props.onAddPlace}/>
           </section>
           <section className="elements">
               {cards.map((card) => (
                 <Card key={card._id} card={card} onCardClick={props.onCardClick}/>
               ))}
           </section>
         </main> </>
    )
}

