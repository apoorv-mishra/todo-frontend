import React from 'react';
import {
  Link
} from "react-router-dom";

import Header from './Header';
import TodoList from './TodoList/TodoList';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      email: '',
      password: '',
    }
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
      password: this.state.password,
    })
  }

  handlePasswordChange(e) {
    this.setState({
      email: this.state.email,
      password: e.target.value,
    });
  }

  async handleLogin(e) {
    e.preventDefault();

    // TODO:validate
    // Utils.validateEmail(this.state.firstName)
    // Utils.validatePassword(this.state.firstName)

    async function postData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
	method: 'POST', // *GET, POST, PUT, DELETE, etc.
	mode: 'cors', // no-cors, *cors, same-origin
	cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	credentials: 'same-origin', // include, *same-origin, omit
	headers: {
	  'Content-Type': 'application/json'
	  // 'Content-Type': 'application/x-www-form-urlencoded',
	},
	redirect: 'follow', // manual, *follow, error
	referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    const data = await postData(`${process.env.REACT_APP_BASE_API_URL}/login`, {
      email: this.state.email,
      password: this.state.password 
    });

    if (data.message === 'Login successful!') {
      localStorage.setItem('user', JSON.stringify({ token: data.token, id: data.id, name: data.name }));
      this.props.toggleUserLoginStatus(true);
    }
  }

  render() {

    if (this.props.isUserLoggedIn) {
      const name = JSON.parse(localStorage.getItem('user')).name;
      return (
	<div>
	  <Header name={name} logout={this.props.logout}/>
	  <TodoList />
	</div>
      );
    }
    return (
      <div>
	<form onSubmit={this.handleLogin}>
	  <div className="form-group">
	    <label htmlFor="exampleInputEmail1">Email address</label>
	    <input type="email" value={this.state.email} onChange={this.handleEmailChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
	  </div>
	  <div className="form-group">
	    <label htmlFor="exampleInputPassword1">Password</label>
	    <input type="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
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
}

export default Home;
