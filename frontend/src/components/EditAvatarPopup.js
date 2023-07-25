import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, onLoading}) {
  const avatarRef = React.useRef('');

  React.useEffect(() => {
    avatarRef.current.value='';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return(
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={onLoading ? `Сохранение...` : `Сохранить`}
    >
      <input 
        type="url" 
        name="avatar" 
        className="popup__field popup__field_type_title popup__field_pos_top" 
        placeholder="Ссылка" 
        ref={avatarRef}
        required
      />
      <span className="popup__field-error">Вы пропустили это поле.</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup