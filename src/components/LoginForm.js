import { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { FaDoorOpen } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import InputField from './InputField';

function LoginForm({ onLogin, showError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const emailError = !email ? 'Email is required.' : !email.includes('@') ? 'Email must include an @ sign.' : '';

  const passwordError = !password
    ? 'Password is required.'
    : password.length < 8
    ? 'Password must be at least 8 characters.'
    : '';

  function onClickSubmit(evt) {
    evt.preventDefault();
    setError('');
    setSuccess('');

    if (emailError || passwordError) {
      setError('Please fix errors above.');
      showError('Please fix errors above.');
      return;
    }

    axios(`${process.env.REACT_APP_API_URL}/api/user/login`, {
      method: 'post',
      data: { email, password },
    })
      .then((res) => {
        console.log(res);
        setSuccess(res.data.message);
        const authPayload = jwt.decode(res.data.token);
        const auth = {
          email,
          userId: res.data.userId,
          token: res.data.token,
          payload: authPayload,
        };
        console.log(auth);
        onLogin(auth);
      })
      .catch((err) => {
        console.error(err);
        const resError = err?.response?.data?.error;
        if (resError) {
          if (typeof resError === 'string') {
            setError(resError);
            showError(resError);
          } else if (resError.details) {
            setError(_.map(resError.details, (x) => <div>{x.message}</div>));
          } else {
            setError(JSON.stringify(resError));
          }
        } else {
          setError(err.message);
          showError(err.message);
        }
      });
  }

  function onInputChange(evt, setValue) {
    const newValue = evt.currentTarget.value;
    setValue(newValue);
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <InputField
          label="Email"
          id="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={(evt) => onInputChange(evt, setEmail)}
          error={emailError}
        />
        <InputField
          label="Password"
          id="LoginForm-password"
          type="password"
          placeholder=""
          autoComplete="current-password"
          value={password}
          onChange={(evt) => onInputChange(evt, setPassword)}
          error={passwordError}
        />

        <div className="mb-3 d-flex align-items-center">
          <button className="btn btn-primary me-3 d-flex align-items-center" type="submit" onClick={(evt) => onClickSubmit(evt)}>
            <FaDoorOpen className='me-2' />
            Login
          </button>
          <div>
            <div>Don't have an account yet?</div>
            <Link to="/register">Register Here</Link>
          </div>
        </div>
        
        {error && <div className="mb-3 text-danger">{error}</div>}
        {success && <div className="mb-3 text-success">{success}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
