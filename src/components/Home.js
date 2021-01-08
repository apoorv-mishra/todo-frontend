import React from 'react';
import {
  Link
} from "react-router-dom";

import Header from './Header';
import TodoList from './TodoList/TodoList';
import Login from './Login';

function Home(props) {
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
      <Login toggleUserLoginStatus={props.toggleUserLoginStatus}/>
      <p>Or</p>
      <Link to="/signup">
        <button className="btn btn-primary">SignUp</button>
      </Link>
    </div>
  );
}

export default Home;
