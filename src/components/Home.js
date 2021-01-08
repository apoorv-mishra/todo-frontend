import React, { useState } from 'react';
import {
  Link
} from "react-router-dom";

import Header from './Header';
import TodoList from './TodoList/TodoList';

import Api from '../Api';

function Home(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await Api.login({ email, password });
      if (res.message === 'Login successful!') {
        localStorage.setItem('user', JSON.stringify({
          token: res.token,
          id: res.id,
          name: res.name
        }));
        props.toggleUserLoginStatus(true);
      }
    } catch(err) {
      throw err;
    }
  }

  if (props.isUserLoggedIn) {
    const name = JSON.parse(localStorage.getItem('user')).name;
    return (
      <div>
        <Header name={name} logout={props.logout}/>
        <TodoList />
      </div>
    );
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" value={email} onChange={handleEmailChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" value={password} onChange={handlePasswordChange} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <p>Or</p>
      <Link to="/signup">
        <button className="btn btn-primary">SignUp</button>
      </Link>
    </div>
  );
}

export default Home;
