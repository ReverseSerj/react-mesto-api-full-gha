//scalable config
const validationCfg = {
  popupsBody: '.popup__body',
  popupSubmitButtonOn: '.popup__submit',
  popupSubmitButtonOff: 'popup__submit_inactive',
  popupField: '.popup__field',
  fieldErrorTextOff: '.popup__field-error',
  fieldErrorTextOn: 'popup__field-error_active',
  popupInvalidField: 'popup__field_invalid',
  fieldContainer: '.popup__field-container'
};

const nameInput = document.querySelector('.popup__field_type_name');
const aboutInput = document.querySelector('.popup__field_type_status');

//pageBtns
const btnAddPost = document.querySelector('.profile__add-post');
const btnEditProfile = document.querySelector('.profile__edit');
const btnEditAvatar = document.querySelector('.profile__avatar-edit-button');

//template
const templateCard = document.querySelector('#post-card').content;
const elementCard = templateCard.querySelector('.element');
const templateClassName = '#post-card';

//initialCardsArray
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export {
  validationCfg,
  btnAddPost,
  btnEditProfile,
  templateCard,
  elementCard,
  templateClassName,
  initialCards,
  nameInput,
  aboutInput,
  btnEditAvatar
};
