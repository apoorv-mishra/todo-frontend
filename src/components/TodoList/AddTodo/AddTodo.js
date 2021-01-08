import React, { useState } from 'react';

import Api from '../../../Api';

function AddTodo(props) {
  const [todo, setTodo] = useState('');

  function handleChange(e) {
    setTodo(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const res = await Api.createTodo({ name: todo })
      if (res.message === 'Todo created!') {
	await props.refreshTodoList();
	setTodo('');
      }
    } catch(err) {
      throw err;
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
