import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/svg/logo2.svg';
import './Auth.css';
import { authActions } from '../../state/Redux';
import { useForm } from '../../hooks';
import { getLoader } from '../../helpers';

const Login = () => {
  const { loading } = useSelector((state) => getLoader(state));

  const { values, handleInput } = useForm({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.login(values));
  };

  const { email, password } = values;
  return (
    <section className="auth inverted">
      <div className="main">
        <div className="content">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <h4>Sign In</h4>
          <p>Hello there! Sign in to join us, and to save your money now.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <div className="form-control">
                <input
                  name="email"
                  type="text"
                  placeholder="example@email.com"
                  onChange={handleInput}
                  value={email}
                />
              </div>

              <div className="form-control">
                <input
                  name="password"
                  type="password"
                  className="password-field"
                  placeholder="••••••••"
                  onChange={handleInput}
                  value={password}
                />
              </div>
              <div className="btn-container">
                <button className="btn" type="submit" disabled={loading}>
                  {loading ? 'verifyng' : 'login now'}
                </button>
              </div>
              <Link to="/signup">
                <div className="footer">
                  <p>Don&apos;t have an account?</p>
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
