import React, { useState } from 'react';

import Api from '../Api';

function SignUp(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      const res = await Api.signup({ firstName, lastName, email, password });
      if (res.message === 'SignUp successful!') {
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

  return (
    <div>
      <form onSubmit={handleSignUp}>
	<div className="form-group">
	  <label htmlFor="exampleFirstName1">First name</label>
	  <input type="text" value={firstName} onChange={handleFirstNameChange} className="form-control" id="exampleFirstName1" aria-describedby="firstNameHelp" placeholder="First name"/>
	</div>
	<div className="form-group">
	  <label htmlFor="exampleLastName1">Last name</label>
	  <input type="text" value={lastName} onChange={handleLastNameChange} className="form-control" id="exampleLastName1" placeholder="Last name"/>
	</div>
	<div className="form-group"> <label htmlFor="exampleInputEmail1">Email address</label>
	  <input type="email" value={email} onChange={handleEmailChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
	</div>
	<div className="form-group">
	  <label htmlFor="exampleInputPassword1">Password</label>
	  <input type="password" value={password} onChange={handlePasswordChange} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
	</div>
	<button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
