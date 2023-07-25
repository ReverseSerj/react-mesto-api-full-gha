import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api }  from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPostPopup from "./AddPostPopup";
import InfoTooltip from "./InfoTooltip";
import { authApi } from "../utils/AuthApi";

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = useState(false);
  const [isInfoTolltipSuccess, setIsInfoTolltipSucces] = useState(false);
  const [isAuthenPopupOpen, setIsAuthenPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [cards, setCards] = useState([]);

  const [headerEmail, setHeaderEmail] = useState('');
  const [isPreLoggedIn, setPreIsLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteConfirmClick() {
    setIsDeleteConfirmPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.delCard(card._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== (card._id)))
      })
      .catch((err) => { 
        console.log(err);
      })
      
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.patchEditPorfile(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.updateAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPostSubmit(data) {
    setIsLoading(true);
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleRegisterUser(email, password) {
    authApi.registerUser(email, password)
      .then((data) =>{
        if (data) {
          setIsInfoTolltipSucces(true);
          navigate('/sign-in');
        }
      })
      .catch((err) => {
        setIsInfoTolltipSucces(false);
        console.log(err);
      })
      .finally(() => setIsAuthenPopupOpen(true));
  }

  function handleAuthUser(email, password) {
    authApi.authUser(email, password) 
      .then((data) => {
        if(data.token) {
          localStorage.setItem('jwt', data.token);
          setPreIsLoggedIn(true);
          setHeaderEmail(email);
        } else {
          setIsInfoTolltipSucces(false);
          setIsAuthenPopupOpen(true);
          console.log('получен не верный объект от сервера');
        }
      })

      .catch((err) => {
        setIsInfoTolltipSucces(false);
        setIsAuthenPopupOpen(true);
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setPreIsLoggedIn(false);
    setIsLoggedIn(false);
    setHeaderEmail('');
    navigate('/sign-in');
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authApi.setAuthToken(jwt);
      authApi.getUserEmail()
      .then((data) => {
          setPreIsLoggedIn(true);
          setIsLoggedIn(true);
          setHeaderEmail(data.data.email);
          navigate('/');
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, []);
    
  useEffect(() => {
    if(isPreLoggedIn) {
        const jwt = localStorage.getItem('jwt');
      if (jwt) {
        authApi.setAuthToken(jwt);
        authApi.getUserEmail()
        .then((data) => {
            setIsLoggedIn(true);
            setHeaderEmail(data.data.email);
            navigate('/');
        })
        .catch((err) => {
          console.log(err);
        })
      } 
    }
  }, [isPreLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([data, cards]) => {
        setCurrentUser(data);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },[isLoggedIn]); 

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteConfirmPopupOpen(false);
    setIsAuthenPopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header 
            onSignOut={signOut} 
            headerEmail={headerEmail}
          />
          <Routes>
            <Route element={<ProtectedRoute isLoggedIn={isLoggedIn}/>}>
              <Route
                exact
                path='/'
                element={
                  <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onDeleteConfirm={handleDeleteConfirmClick}
                    cards={cards}
                  />
                }
              />
            </Route>
            <Route exact path='/sign-up' element={<Register onRegister={handleRegisterUser} />} />
            <Route exact path='/sign-in' element={<Login onLogin={handleAuthUser} />} />
            <Route element={isLoggedIn ? <Navigate to='/'/> : <Navigate to='/sign-in'/>}/>
          </Routes>
          <Footer />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}
          />
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
          />
          <AddPostPopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAddPostSubmit}
            onLoading={isLoading}
          />
          <PopupWithForm
            name={'delete'}
            title={'Вы уверены ?'}
            buttonText={'Да'}
            isOpen={isDeleteConfirmPopupOpen}
            onClose={closeAllPopups}
          />
          <ImagePopup 
            card={selectedCard} 
            onClose={closeAllPopups} 
          />
          <InfoTooltip
            name={'authen'} 
            isOpen={isAuthenPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isInfoTolltipSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
