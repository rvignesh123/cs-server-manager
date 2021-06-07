import React from "react";
import { Row, Col, Jumbotron } from "react-bootstrap";
import { withRouter } from "react-router";
import ManagerSideBar from "./ManagerSideBar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Welcome from "../Welcome";

export default function Manager() {
  let { path, url } = useRouteMatch();
  return (
    <Row>
      <Col xs={2} id="sidebar-wrapper">
        <ManagerSideBar />
      </Col>
      <Col xs={10} id="page-content-wrapper">
        <Switch>
          <Route exact path={path}>
            <h3>Please select a topic.</h3>
          </Route>
          <Route path={`${path}/:topicId`}>
            <h3>Please sTest.</h3>
          </Route>
        </Switch>
      </Col>
    </Row>
  );
}
