import React from 'react';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleFirstNameChange(e) {
    this.setState({
      firstName: e.target.value,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    });
  }

  handleLastNameChange(e) {
    this.setState({
      firstName: this.state.firstName,
      lastName: e.target.value,
      email: this.state.email,
      password: this.state.password
    });
  }

  handleEmailChange(e) {
    this.setState({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: e.target.value,
      password: this.state.password
    });
  }

  handlePasswordChange(e) {
    this.setState({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: e.target.value
    });
  }

  async handleSignUp(e) {
    e.preventDefault();

    // TODO:validate
    // Utils.validateName(this.state.firstName)
    // Utils.validateName(this.state.firstName)
    // Utils.validateEmail(this.state.email)
    // Utils.validatePassword(this.state.email)

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

    const data = await postData(`${process.env.REACT_APP_BASE_API_URL}/signup`, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password 
    });

    if (data.message === 'SignUp successful!') {
      localStorage.setItem('user', JSON.stringify({ token: data.token, id: data.id, name: data.name }));
      this.props.toggleUserLoginStatus(true);
    }
  }

  render() {
    return (
      <div>
	<form onSubmit={this.handleSignUp}>
	  <div className="form-group">
	    <label htmlFor="exampleFirstName1">First name</label>
	    <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange} className="form-control" id="exampleFirstName1" aria-describedby="firstNameHelp" placeholder="First name"/>
	  </div>
	  <div className="form-group">
	    <label htmlFor="exampleLastName1">Last name</label>
	    <input type="text" value={this.state.lastName} onChange={this.handleLastNameChange} className="form-control" id="exampleLastName1" placeholder="Last name"/>
	  </div>
	  <div className="form-group"> <label htmlFor="exampleInputEmail1">Email address</label>
	    <input type="email" value={this.state.email} onChange={this.handleEmailChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
	  </div>
	  <div className="form-group">
	    <label htmlFor="exampleInputPassword1">Password</label>
	    <input type="password" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
	  </div>
	  <button type="submit" className="btn btn-primary">Submit</button>
	</form>
      </div>
    );
  }

}

export default SignUp;
