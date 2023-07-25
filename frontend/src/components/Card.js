import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButton = (`element__delete-post ${isOwn ? 'element__delete-post_active' : ''}`);

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButton = (`element__like ${isLiked && 'element__like_active'}`);

  function handleCardClick() {
    onCardClick(card);
  }  

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <article className="element">
      <img className="element__img" src={card.link} alt={card.name} onClick={handleCardClick}/>
      <button className={cardDeleteButton} type="button" aria-label="Удалить Пост" onClick={handleDeleteClick}></button>
      <div className="element__description">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-container" >
          <button className={cardLikeButton} type="button" aria-label="Мне Нравится" onClick={handleLikeClick}></button>
          <p className="element__like-quantity">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;