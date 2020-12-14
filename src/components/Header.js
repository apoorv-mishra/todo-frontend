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

export default Header;
