import React from 'react';
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
// 	<Header/>
// 	<TodoList>
// 		<AddTodo/>
// 		<TodoItems>
// 			<TodoItem/>
// 			<TodoItem/>
// 			<TodoItem/>
// 			.
// 			.
// 			.
// 		</TodoItems>
// 		<Footer/>
// 	</TodoList>
// </TodoApp>

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: localStorage.getItem('user') ? true : false
    };

    this.toggleUserLoginStatus = this.toggleUserLoginStatus.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleUserLoginStatus(isLoggedIn) {
    this.setState({
      isUserLoggedIn: isLoggedIn
    });
  }

  logout() {
    localStorage.clear();
    this.setState({
      isUserLoggedIn: false
    });
  }

  render() {
    return (
      <Router>
	<Switch>
	  <Route exact path="/">
	    <Home isUserLoggedIn={this.state.isUserLoggedIn} logout={this.logout} toggleUserLoginStatus={(s) => this.toggleUserLoginStatus(s)} />
	  </Route>
	  <Route path="/signup">
	    {this.state.isUserLoggedIn ? <Redirect to='/' /> : <SignUp toggleUserLoginStatus={(status) => this.toggleUserLoginStatus(status)} />}
	  </Route>
	</Switch>
      </Router>
    );
  }
}

export default TodoApp;
