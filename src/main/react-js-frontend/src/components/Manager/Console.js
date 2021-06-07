import React from "react";

import { Jumbotron, Row, Col } from "react-bootstrap";

export default function Console(props) {
  return (
    <Row>
      <Col lg={12} className={"margin-top"}>
        <Jumbotron className="bg-dark text-white">
          <h1>Manager Console</h1>
          <blockquote className="blockquote mb-0">
            <p>Build in progress</p>
            <footer className="blockquote-footer">Test footer</footer>
          </blockquote>
        </Jumbotron>
      </Col>
    </Row>
  );
}
