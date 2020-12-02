import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/svg/logo2.svg';
import './Auth.css';
import { useForm } from '../../hooks';
import { authActions } from '../../state/Redux';
import { getLocalAuthState } from '../../helpers';

const SignUp = () => {
  const { loading } = useSelector((state) => getLocalAuthState(state));

  const { values, handleInput } = useForm({
    username: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.signUp(values));
  };
  const { email, username, password } = values;

  return (
    <section className="auth">
      <div className="main">
        <div className="content">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <h4>Sign Up</h4>
          <p>Hello there! Sign up and get started to save your money now.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <div className="form-control">
                <input
                  name="email"
                  type="text"
                  value={email}
                  onChange={handleInput}
                  placeholder="example@email.com"
                />
              </div>
              <div className="form-control">
                <input
                  name="username"
                  type="text"
                  value={username}
                  onChange={handleInput}
                  placeholder="John Doe"
                />
              </div>
              <div className="form-control">
                <input
                  name="password"
                  type="password"
                  className="password-field"
                  value={password}
                  onChange={handleInput}
                  placeholder="••••••••"
                />
              </div>
              <div className="btn-container">
                <button className="btn" type="submit" disabled={loading}>
                  {loading ? 'verifyng' : 'sign up'}
                </button>
              </div>
              <Link to="/login">
                <div className="footer">
                  <p>Already have an account?</p>
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
