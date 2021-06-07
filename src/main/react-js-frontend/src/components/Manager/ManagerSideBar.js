import React from "react";
import { Row, Col, Nav } from "react-bootstrap";
import "../../styles/Manager.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function ManagerSideBar(props) {
  let { path, url } = useRouteMatch();
  return (
    <Nav
      className="col-md-12 d-none d-md-block bg-light sidebar"
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <div className="sidebar-sticky"></div>
      <Nav>
        <Link to={`${url}/console`}>
          <FontAwesomeIcon icon={faSignInAlt} /> Console
        </Link>
      </Nav>
      <Nav>
        <Link to={`${url}/maps`}>
          <FontAwesomeIcon icon={faSignInAlt} /> Change Map
        </Link>
      </Nav>
    </Nav>
  );
}
