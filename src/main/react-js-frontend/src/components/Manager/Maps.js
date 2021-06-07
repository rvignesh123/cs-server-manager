import React from "react";

import { Jumbotron, Row, Col } from "react-bootstrap";

export default function Maps(props) {
  return (
    <Row>
      <Col lg={12} className={"margin-top"}>
        <Jumbotron className="bg-dark text-white">
          <h1>Maps Loader</h1>
          <blockquote className="blockquote mb-0">
            <p>My Maps</p>
            <footer className="blockquote-footer">Test it</footer>
          </blockquote>
        </Jumbotron>
      </Col>
    </Row>
  );
}
