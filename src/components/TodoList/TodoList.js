import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo/AddTodo';
import TodoItems from './TodoItems/TodoItems';
import Footer from './Footer/Footer';

import Api from '../../Api.js'

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
    const todos = await Api.getTodos();
    if (todos.length) {
      setTodoList(todos.map(t => {
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
    try {
      await Api.updateTodo(id, { deadline });
      await refreshTodoList();
    } catch(err) {
      throw err;
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
    let todoToToggle;
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === id) {
        todoToToggle = todoList[i];
      }
    }

    try {
      await Api.updateTodo(id, {
        done: !todoToToggle.done
      });
      await refreshTodoList();
    } catch(err) {
      throw err;
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
