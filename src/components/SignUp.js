import React, { useState } from 'react';

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
      firstName,
      lastName,
      email,
      password,
    });

    if (data.message === 'SignUp successful!') {
      localStorage.setItem('user', JSON.stringify({ token: data.token, id: data.id, name: data.name }));
      props.toggleUserLoginStatus(true);
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
