import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPostPopup({ onSubmit, isOpen, onClose, onLoading }) {
  const {values, handleChange, setValues} = useForm({});
 
  React.useEffect(() => {
    if (isOpen) {
      setValues({});
    }
  }, [isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({
      name: values.name,
      link: values.link
    });
  }

  return (
    <PopupWithForm
      name={'post'}
      title={'Новое место'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={onLoading  ? 'Сохранение...' : 'Сохранить'}
    >
      <input 
        type="text" 
        name="name" 
        className="popup__field popup__field_type_title popup__field_pos_top" 
        placeholder="Название"
        minLength="2" 
        maxLength="30"
        onChange={handleChange}
        value={values.name || ''}
        required
      />
      <span className="popup__field-error">Вы пропустили это поле.</span>

      <input 
        type="url" 
        name="link" 
        className="popup__field popup__field_type_link popup__field_pos_bottom" 
        placeholder="Ссылка на картинку"
        onChange={handleChange}
        value={values.link || ''}
        required
      />
      <span className="popup__field-error">Введите адрес сайта.</span>
    </PopupWithForm>
  );
}

export default AddPostPopup