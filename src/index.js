import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

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

const todoList = [
  {
    id: 1,
    name: 'Milk',
    done: false,
    comments: []
  },
  {
    id: 2,
    name: 'Water',
    done: false,
    comments: []
  },
  {
    id: 3,
    name: 'Cleaning',
    done: false,
    comments: []
  },
  {
    id: 4,
    name: 'Exercise',
    done: false,
    comments: []
  }
]

function TodoItem(props) {
  return (
    <li className="todo-item" key={props.id}>
      <div className="checkbox">
	<label className={props.done? "done": null}>
	  <input
	    type="checkbox"
	    checked={props.done}
	    id={props.id}
	    onChange={() => props.toggleTodoState(props.id)}
	  />
	  {props.name}
	</label>
      </div>
    </li>
  );

}

function TodoItems(props) {
  const items = props.todoItems.map(
    item => <TodoItem
      key={item.id}
      id={item.id}
      name={item.name}
      done={item.done}
      toggleTodoState={(id) => props.toggleTodoState(id)}
    />
  );
  return (
    <ul className="list-unstyled todo-items">{items}</ul>
  );
}

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      todo: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.todo) {
      this.props.addTodo(this.state.todo);
      this.setState({ todo: '' });
    }
  }

  render() {
    return (
      <div className="add-todo-container">
	<form onSubmit={this.handleSubmit}>
	  <input
	    type="text"
	    name="name"
	    autoComplete="off"
	    value={this.state.todo}
	    placeholder="What needs to be done?"
	    onChange={this.handleChange}
	  />
	  <input type="submit" className="hidden" />
	</form>
      </div>
    );
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList,
      toDisplay: 'all'
    }
    this.displayAllTodos = this.displayAllTodos.bind(this);
    this.displayActiveTodos = this.displayActiveTodos.bind(this);
    this.displayCompletedTodos = this.displayCompletedTodos.bind(this);
    this.toggleTodoState = this.toggleTodoState.bind(this);
  }

  addTodo(name) {
    let todoList = [...this.state.todoList];
    let todo = {
      id: this.state.todoList.length + 1,
      name: name,
      done: false,
      comments: []
    }
    todoList.push(todo);

    this.setState({
      todoList,
      toDisplay: this.state.toDisplay
    });
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

  toggleTodoState(id) {
    let todoList = [...this.state.todoList];
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === id) {
	todoList[i].done = !todoList[i].done;
      }
    }

    this.setState({
      todoList,
      toDisplay: this.state.toDisplay
    });
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
	  <AddTodo addTodo={this.addTodo.bind(this)}/>
	  <hr />
	  <TodoItems todoItems={todoItems} toggleTodoState={this.toggleTodoState}/>
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


function Header(props) {
  return (
    <div>
      <div className="d-flex flex-row bd-highlight mb-3 justify-content-between">
	<div className="p-2 bd-highlight">Welcome, {props.name}</div>
	<div className="p-2 bd-highlight">
	  <button type="button" onClick={props.logout} className="btn btn-primary">Logout</button>
	</div>
      </div>   
      <div className="header">Todos</div>
    </div>
  );
}

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    };
  }

  onClick(id) {
    this.setState({
      active: id
    });
  }

  render() {
    const getClasses = id => (id === this.state.active) ? "filter-buttons selected" : "filter-buttons";

    return (
      <div className="footer">
	<div className="undone-item-count-container">
	  <p className="undone-item-count">{this.props.activeTodosCount} items left</p>
	</div>
	<div className="filter-buttons-container">
	  <button
	    className={getClasses(0)}
	    onClick={() => {
	      this.onClick(0);
	      this.props.displayAllTodos();
	    }}>
	    All
	  </button>
	  <button
	    className={getClasses(1)}
	    onClick={() => {
	      this.onClick(1);
	      this.props.displayActiveTodos();
	    }}>
	    Active
	  </button>
	  <button
	    className={getClasses(2)}
	    onClick={() => {
	      this.onClick(2);
	      this.props.displayCompletedTodos();
	    }}>
	    Completed
	  </button>
	</div>
      </div>
    );
  }
}



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

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);
