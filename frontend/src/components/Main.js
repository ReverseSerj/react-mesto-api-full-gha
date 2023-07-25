import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <div className="Main">
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={currentUser.avatar} alt="фото профиля"/>
            <button className="profile__avatar-edit-button" type="button" aria-label="Редактировать аватар" onClick={onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <div className="profile__header">
              <h1 className="profile__nickname">{currentUser.name}</h1>
              <button className="profile__edit" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
            </div>
            <p className="profile__status">{currentUser.about}</p>
          </div>
          <button className="profile__add-post" type="button" onClick={onAddPlace}></button>
        </section>
        <ul className="elements">
          {cards.map((card) => {
            return (
              <li key={card._id}>
                <Card 
                  card={card} 
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  )
}

export default Main;