import React, { useState } from 'react';

function AddTodo(props) {
  const [todo, setTodo] = useState('');

  function handleChange(e) {
    setTodo(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    async function postData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
	method: 'POST', // *GET, POST, PUT, DELETE, etc.
	mode: 'cors', // no-cors, *cors, same-origin
	cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	credentials: 'same-origin', // include, *same-origin, omit
	headers: {
	  'Content-Type': 'application/json',
	  'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
	  // 'Content-Type': 'application/x-www-form-urlencoded',
	},
	redirect: 'follow', // manual, *follow, error
	referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    if (todo) {
      const data = await postData(`${process.env.REACT_APP_BASE_API_URL}/todo/create?userId=${JSON.parse(localStorage.getItem('user')).id}`, {
	name: todo
      });

      if (data.message === 'Todo created!') {
	await props.refreshTodoList();
	setTodo('');
      }
    }
  }

  return (
    <div className="add-todo-container">
      <form onSubmit={handleSubmit}>
	<input
	  type="text"
	  name="name"
	  className="add-todo-input"
	  autoComplete="off"
	  value={todo}
	  placeholder="What needs to be done?"
	  onChange={handleChange}
	/>
	<input type="submit" className="hidden" />
      </form>
    </div>
  );
}

export default AddTodo;
