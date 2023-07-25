import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({card, onClose}) { 
  usePopupClose(card?.link, onClose)
  return (
    <div className={`popup popup_type_photo ${card.name ? `popup_opened` : ``}`}>
      <div className="popup__container-photo">
        <button className="popup__close popup__close_type_photo" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <img className="popup__img" src={card.link} alt={card.name}/>
        <h2 className="popup__caption">{card.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;