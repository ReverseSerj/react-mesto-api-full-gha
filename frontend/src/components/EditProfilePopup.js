import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup ({isOpen, onClose, onUpdateUser, onLoading}) {
 
const currentUser = React.useContext(CurrentUserContext);

  const {values, handleChange, setValues} = useForm({});
  
  React.useEffect(() => {
    setValues({...currentUser});
  }, [currentUser, isOpen, setValues]);


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about
    });
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={onLoading ? `Сохранение...` : `Сохранить`}
    >
      <input 
        type="text" 
        name="name" 
        className="popup__field popup__field_type_name popup__field_pos_top" 
        placeholder="Имя" 
        minLength="2" 
        maxLength="40"
        onChange={handleChange}
        value={values.name || ''}
        required 
      />
      <span className="popup__field-error">Вы пропустили это поле.</span>
      
      <input 
        type="text" 
        name="about" 
        className="popup__field popup__field_type_status popup__field_pos_bottom" 
        placeholder="О себе" 
        minLength="2" 
        maxLength="200"
        onChange={handleChange}
        value={values.about || ''}
        required
      />
      <span className="popup__field-error" id="about-status">Вы пропустили это поле.</span>
    </PopupWithForm>
  )
  
}

export default EditProfilePopup