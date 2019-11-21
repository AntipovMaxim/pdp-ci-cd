import get from 'lodash/get';

import React, { useState, useRef } from 'react';
import { useAuth } from '../../../../core/providers/auth-provider/useAuth';

import './style.scss';

const AuthPageNew = () => {
  const auth = useAuth();
  const [isRegister, setAuthMode] = useState(false);
  const initialFormState = { email: '', password: '' };
  const [formData, setFormData] = useState(initialFormState);
  const label = isRegister ? 'REGISTER' : 'LOGIN';
  const error = get(auth, 'user.error.message', '');


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const toggleAuthMode = () => {
    setAuthMode(!isRegister);
  };

  const onSubmitForm = (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    const { register, login } = auth;
    const { email, password } = formData;

    if (!email || !password) {
      return;
    }

    const submit = isRegister ? register : login;

    submit(email, password);
  };

  return (
    <article className="auth-page">
      <section>
        Try to -
        <button
          type="button"
          onClick={toggleAuthMode}
          className="auth-page__link"
        >
          {isRegister ? 'LOGIN' : 'REGISTER'}
        </button>
        <form
          className="auth-form"
          onSubmit={onSubmitForm}
        >
          <h3>{label}</h3>
          <span className="error-text">{error}</span>
          <div>
            <label htmlFor="email">
              <div className="form__label">Email:</div>
              <input
                className="auth-form__input"
                id="email"
                type="text"
                placeholder="email"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <div className="form__label">Password:</div>
              <input
                className="auth-form__input"
                id="password"
                type="password"
                placeholder="password"
                value={formData.password}
                name="password"
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button
            className="auth-form__submit"
            type="submit"
            onClick={onSubmitForm}
          >
            {label}
          </button>
        </form>
      </section>
    </article>
  );
};

export default AuthPageNew;
