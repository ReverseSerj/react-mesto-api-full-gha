import { useState } from "react";
import { Link } from "react-router-dom";

function Register ({ onRegister }) {
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values.email, values.password);
  };


  return (
    <form className="authen__form" onSubmit={handleSubmit}>
      <h2 className="authen__title">Регистрация</h2>
      <input className="authen__input" placeholder="Email" onChange={handleChange} value={values.email || ""} name="email" type="email" required/>
      <input className="authen__input" placeholder="Пароль" onChange={handleChange} value={values.password || ""} name="password" type="password" required/>
      <button className="authen__button" type="submit">Зарегистрироваться</button>
      <Link to='/sign-in' className="authen__signin">
        Уже зарегистрированы? Войти
      </Link>
    </form>
  )
}

export default Register;