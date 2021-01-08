import React, { useState } from 'react';

function Footer(props) {
  const [active, setActive] = useState(0);

  function onClick(id) {
    setActive(id);
  }

  const getClasses = id => (id === active) ? "filter-buttons selected" : "filter-buttons";

  return (
    <div className="footer">
      <div className="undone-item-count-container">
        <p className="undone-item-count">{props.activeTodosCount} items left</p>
      </div>
      <div className="filter-buttons-container">
        <button
          className={getClasses(0)}
          onClick={() => {
            onClick(0);
            props.displayAllTodos();
          }}>
          All
        </button>
        <button
          className={getClasses(1)}
          onClick={() => {
            onClick(1);
            props.displayActiveTodos();
          }}>
          Active
        </button>
        <button
          className={getClasses(2)}
          onClick={() => {
            onClick(2);
            props.displayCompletedTodos();
          }}>
          Completed
        </button>
      </div>
    </div>
  );
}

export default Footer;
