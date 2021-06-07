import React from "react";
import { Row, Col, Jumbotron } from "react-bootstrap";
import { withRouter } from "react-router";
import ManagerSideBar from "./ManagerSideBar";
import Console from "./Console";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Welcome from "../Welcome";
import Maps from "./Maps";

export default function Manager() {
  let { path, url } = useRouteMatch();
  return (
    <Row className={"margin-top"}>
      <Col xs={2} id="sidebar-wrapper">
        <ManagerSideBar />
      </Col>
      <Col id="page-content-wrapper">
        <Switch>
          <Route exact path={path}>
            <h3>Please select a topic.</h3>
          </Route>
          <Route path={`${path}/console`}>
            <Console />
          </Route>
          <Route path={`${path}/maps`}>
            <Maps />
          </Route>
        </Switch>
      </Col>
    </Row>
  );
}
