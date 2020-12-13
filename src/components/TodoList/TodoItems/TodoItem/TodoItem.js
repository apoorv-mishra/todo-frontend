import DatePicker from 'react-datepicker';

function TodoItem(props) {
  return (
    <li className="d-flex flex-row justify-content-between bd-highlight mb-3 todo-item" key={props.id}>
      <div className="p-2 bd-highlight checkbox">
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
      <div className="p-2 bd-highlight">
	{
	  props.done ?
	    (
	      props.deadline ?
	      `Completed on ${props.deadline.getMonth() + 1}/${props.deadline.getDate()}/${props.deadline.getFullYear()}` : ""
	    ):(
	      <DatePicker
		selected={props.deadline}
		onChange={(date) => props.setTodoDeadline(props.id, date)}
		isClearable
		placeholderText="Set Deadline"
	      />
	    )
	}
      </div>
    </li>
  );
}

export default TodoItem;
