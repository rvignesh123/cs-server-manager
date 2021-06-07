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
        <Link to={`${url}/rendering`}>
          <FontAwesomeIcon icon={faSignInAlt} /> Login
        </Link>
      </Nav>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
