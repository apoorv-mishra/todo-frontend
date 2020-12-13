import React from 'react';
import AddTodo from './AddTodo/AddTodo';
import TodoItems from './TodoItems/TodoItems';
import Footer from './Footer/Footer';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      toDisplay: 'all'
    }
    this.displayAllTodos = this.displayAllTodos.bind(this);
    this.displayActiveTodos = this.displayActiveTodos.bind(this);
    this.displayCompletedTodos = this.displayCompletedTodos.bind(this);
    this.toggleTodoState = this.toggleTodoState.bind(this);
    this.refreshTodoList = this.refreshTodoList.bind(this);
    this.setTodoDeadline = this.setTodoDeadline.bind(this);
  }

  async refreshTodoList() {
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
      this.setState({
	todoList: data.todos.map(t => {
	  return {
	    id: t.id,
	    userId: t.userId,
	    name: t.name,
	    done: t.done,
	    deadline: t.deadline ? new Date(t.deadline): null,
	    createdAt: new Date(t.createdAt),
	    updatedAt: new Date(t.updatedAt)
	  }
	}),
	toDisplay: this.state.toDisplay
      });
    }
  }

  async setTodoDeadline(id, deadline) {
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
      await this.refreshTodoList();
    }
  }

  async componentDidMount() {
    await this.refreshTodoList();
  }

  displayAllTodos() {
    this.setState({
      todoList: [...this.state.todoList],
      toDisplay: 'all'
    });
  }

  displayActiveTodos() {
    this.setState({
      todoList: [...this.state.todoList],
      toDisplay: 'active'
    });
  }

  displayCompletedTodos() {
    this.setState({
      todoList: [...this.state.todoList],
      toDisplay: 'completed'
    });
  }

  async toggleTodoState(id) {
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
    let todoList = [...this.state.todoList];
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === id) {
	todoToToggle = todoList[i];
      }
    }

    const data = await patchData(`${process.env.REACT_APP_BASE_API_URL}/todo/${id}/update?userId=${JSON.parse(localStorage.getItem('user')).id}`, {
      done: !todoToToggle.done
    });

    if (data.message === 'Todo updated!') {
      await this.refreshTodoList();
    }
  }

  render() {
    let todoItems;
    if (this.state.toDisplay === 'all') {
      todoItems = [...this.state.todoList];
    } else if (this.state.toDisplay === 'active') {
      todoItems = this.state.todoList.filter(t => !t.done);
    } else {
      todoItems = this.state.todoList.filter(t => t.done);
    }

    return (
      <div className="todo-list-container">
	<div className="todo-list">
	  <AddTodo refreshTodoList={this.refreshTodoList} />
	  <hr />
	  <TodoItems
	    todoItems={todoItems}
	    toggleTodoState={this.toggleTodoState}
	    setTodoDeadline={this.setTodoDeadline}
	  />
	  <Footer
	    activeTodosCount={this.state.todoList.filter(t => !t.done).length}
	    displayAllTodos={this.displayAllTodos}
	    displayActiveTodos={this.displayActiveTodos}
	    displayCompletedTodos={this.displayCompletedTodos}
	  />
	</div>
      </div>
    );
  }
}

export default TodoList;
