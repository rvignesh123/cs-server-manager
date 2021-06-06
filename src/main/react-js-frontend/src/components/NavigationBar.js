import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

class NavigationBar extends Component {
  render() {
    const guestLinks = (
      <>
        <div className="mr-auto"></div>
        <Nav className="navbar-right">
          <Link to={"register"} className="nav-link">
            <FontAwesomeIcon icon={faUserPlus} /> Register
          </Link>
          <Link to={"login"} className="nav-link">
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Link>
        </Nav>
      </>
    );
    const userLinks = (
      <>
        <Nav className="mr-auto">
          <Link to={"add"} className="nav-link">
            Add Book
          </Link>
          <Link to={"list"} className="nav-link">
            Book List
          </Link>
          <Link to={"users"} className="nav-link">
            User List
          </Link>
        </Nav>
        <Nav className="navbar-right">
          <Link to={"logout"} className="nav-link" onClick={this.logout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Link>
        </Nav>
      </>
    );

    return (
      <Navbar bg="dark" variant="dark">
        <Link to={""} className="navbar-brand">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png"
            width="25"
            height="25"
            alt="brand"
          />{" "}
          Book Store
        </Link>
        {guestLinks}
      </Navbar>
    );
  }
}

export default NavigationBar;
