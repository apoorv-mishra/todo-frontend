import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo/AddTodo';
import TodoItems from './TodoItems/TodoItems';
import Footer from './Footer/Footer';

function TodoList(props) {
  const [todoList, setTodoList] = useState([]);
  const [toDisplay, setToDisplay] = useState('all');

  useEffect(() => {
    async function refresh() {
      await refreshTodoList()
    }
    refresh();
  }, []);

  async function refreshTodoList() {
    async function getData(url) {
      // Default options are marked with *
      const response = await fetch(url, {
	method: 'GET', // *GET, POST, PUT, DELETE, etc.
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
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    const data = await getData(`${process.env.REACT_APP_BASE_API_URL}/todos?userId=${JSON.parse(localStorage.getItem('user')).id}`);
    if (data.message === 'Todos!') {
      setTodoList(data.todos.map(t => {
	return {
	  id: t.id,
	  userId: t.userId,
	  name: t.name,
	  done: t.done,
	  deadline: t.deadline ? new Date(t.deadline): null,
	  createdAt: new Date(t.createdAt),
	  updatedAt: new Date(t.updatedAt)
	}
      }));
    }
  }

  async function setTodoDeadline(id, deadline) {
    async function patchData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
	method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
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

    const data = await patchData(`${process.env.REACT_APP_BASE_API_URL}/todo/${id}/update?userId=${JSON.parse(localStorage.getItem('user')).id}`, {
      deadline: deadline 
    });

    if (data.message === 'Todo updated!') {
      await refreshTodoList();
    }
  }

  function displayAllTodos() {
    setToDisplay('all');
  }

  function displayActiveTodos() {
    setToDisplay('active');
  }

  function displayCompletedTodos() {
    setToDisplay('completed');
  }

  async function toggleTodoState(id) {
    async function patchData(url = '', data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
	method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
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

    let todoToToggle;
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === id) {
	todoToToggle = todoList[i];
      }
    }

    const data = await patchData(`${process.env.REACT_APP_BASE_API_URL}/todo/${id}/update?userId=${JSON.parse(localStorage.getItem('user')).id}`, {
      done: !todoToToggle.done
    });

    if (data.message === 'Todo updated!') {
      await refreshTodoList();
    }
  }

  let todoItems;
  if (toDisplay === 'all') {
    todoItems = [...todoList];
  } else if (toDisplay === 'active') {
    todoItems = todoList.filter(t => !t.done);
  } else {
    todoItems = todoList.filter(t => t.done);
  }

  return (
    <div className="todo-list-container">
      <div className="todo-list">
	<AddTodo refreshTodoList={refreshTodoList} />
	<hr />
	<TodoItems
	  todoItems={todoItems}
	  toggleTodoState={toggleTodoState}
	  setTodoDeadline={setTodoDeadline}
	/>
	<Footer
	  activeTodosCount={todoList.filter(t => !t.done).length}
	  displayAllTodos={displayAllTodos}
	  displayActiveTodos={displayActiveTodos}
	  displayCompletedTodos={displayCompletedTodos}
	/>
      </div>
    </div>
  );
}

export default TodoList;
