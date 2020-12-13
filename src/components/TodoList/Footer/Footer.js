import React from 'react';

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

export default Footer;
