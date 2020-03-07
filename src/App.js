import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreateCrud from "./components/create-crud.component";
import EditCrud from "./components/edit-crud.component";
import CrudList from "./components/crud-list.component";
import DeleteCrud from "./components/delete-crud.component";
import logo from "./logo.png";
class App extends Component {
  render(){
  return (
    <Router>
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
          <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
        </a>
        <Link to="/" className="navbar-brand">MERN-CRUD App</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">List</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create </Link>
            </li>
          </ul>
        </div>
      </nav>
      <br/>
      <Route path="/" exact component={CrudList} />
      <Route path="/edit/:id" component={EditCrud} />
      <Route path="/create" component={CreateCrud} />
      <Route path="/delete/:id" component={DeleteCrud} />
    </div>
  </Router>
      
  );
}
}

export default App;
