import React from "react";
import { Row, Col, Nav, ListGroup } from "react-bootstrap";
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
  faDraftingCompass,
  faSignInAlt,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";

export default function ManagerSideBar(props) {
  let { path, url } = useRouteMatch();
  return (
    <Nav
      className="col-md-12 d-none d-md-block sidebar"
      activeKey="/manager"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <div className="sidebar-sticky"></div>
      <ListGroup>
        <ListGroup.Item>
          <Link to={`${url}/console`} className="nav-link">
            <FontAwesomeIcon icon={faTerminal} /> Console
          </Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to={`${url}/maps`} className="nav-link">
            <FontAwesomeIcon icon={faDraftingCompass} /> Maps
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </Nav>
  );
}
