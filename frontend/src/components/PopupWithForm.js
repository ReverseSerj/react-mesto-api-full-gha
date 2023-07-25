import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({name, title, children, isOpen, onClose, onSubmit, buttonText}) {
  usePopupClose(isOpen, onClose)
  return (
    <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ``}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className="popup__body" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit" name="button-edit" >{buttonText || 'Сохранить'}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;