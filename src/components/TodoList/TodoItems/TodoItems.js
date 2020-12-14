import TodoItem from './TodoItem/TodoItem';

function TodoItems(props) {
  const items = props.todoItems.map(
    item => <TodoItem
      key={item.id}
      id={item.id}
      name={item.name}
      done={item.done}
      deadline={item.deadline}
      toggleTodoState={(id) => props.toggleTodoState(id)}
      setTodoDeadline={(id, date) => props.setTodoDeadline(id, date)}
    />
  );
  return (
    <ul className="list-unstyled todo-items">{items}</ul>
  );
}

export default TodoItems;
