import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class AuthPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isRegister: true,
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.toggleAuthMode = this.toggleAuthMode.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.getInputRef = this.getInputRef.bind(this);
  }

  componentDidMount() {
    this.textInput.focus();
  }

  onChangeEmail(evt) {
    this.setState({
      email: evt.target.value,
    });
  }

  onChangePassword(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  onSubmitForm(evt) {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    const { register, login } = this.props;
    const { email, password, isRegister } = this.state;

    if (!email || !password) {
      return;
    }

    const submit = isRegister ? register : login;

    submit({
      email,
      password,
    });
  }

  getInputRef(elem) {
    this.textInput = elem;
  }

  getLabel() {
    const { isRegister } = this.state;

    return isRegister ? 'REGISTER' : 'LOGIN';
  }

  toggleAuthMode() {
    const { isRegister } = this.state;
    this.setState({
      isRegister: !isRegister,
    });
  }

  render() {
    const { email, password, isRegister } = this.state;

    return (
      <article className="auth-page">
        <section>
          <button
            type="button"
            onClick={this.toggleAuthMode}
            className="auth-page__link"
          >
            {isRegister ? 'LOGIN' : 'REGISTER'}
          </button>
          <form
            className="form"
            onSubmit={this.onSubmitForm}
          >
            <h3>{this.getLabel()}</h3>
            <div>
              <label htmlFor="email">
                <div className="form__label">Email:</div>
                <input
                  ref={this.getInputRef}
                  className="form__input"
                  id="email"
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={this.onChangeEmail}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                <div className="form__label">Password:</div>
                <input
                  className="form__input"
                  id="password"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </label>
            </div>
            <button
              type="submit"
              onClick={this.onSubmitForm}
            >
              {this.getLabel()}
            </button>
          </form>
        </section>
      </article>
    );
  }
}

AuthPage.propTypes = {
  register: PropTypes.func,
  login: PropTypes.func,
};
