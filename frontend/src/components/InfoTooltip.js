import React from "react";
import { usePopupClose } from "../hooks/usePopupClose";

function InfoTooltip({name, isSuccess, isOpen, onClose}) {
  usePopupClose(isOpen, onClose)
  return (
    <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ``}`}>
      <div className="popup__container">
        <div className={`popup__authen ${ isSuccess ? "popup__authen_type_success" : "popup__authen_type_fail"}`}>
          
        </div>
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose} />
        <h2 className="popup__title">{isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз"}</h2>
      </div>
    </div>
  )
}
export default InfoTooltip;