import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './components/Home.js';
import SignUp from './components/SignUp.js';

/* Structure of TodoApp */
// <TodoApp>
//  <Header/>
//  <TodoList>
//    <AddTodo/>
//    <TodoItems>
//      <TodoItem/>
//      <TodoItem/>
//      <TodoItem/>
//      .
//      .
//      .
//      </TodoItems>
//    <Footer/>
//  </TodoList>
// </TodoApp>

function TodoApp(props) {
  const[isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem('user') ? true : false );

  function toggleUserLoginStatus(isLoggedIn) {
    setIsUserLoggedIn(isLoggedIn);
  }

  function logout() {
    localStorage.clear();
    setIsUserLoggedIn(false);
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home isUserLoggedIn={isUserLoggedIn} logout={logout} toggleUserLoginStatus={(s) => toggleUserLoginStatus(s)} />
        </Route>
        <Route path="/signup">
          {isUserLoggedIn ? <Redirect to='/' /> : <SignUp toggleUserLoginStatus={(status) => toggleUserLoginStatus(status)} />}
        </Route>
      </Switch>
    </Router>
  );
}

export default TodoApp;
