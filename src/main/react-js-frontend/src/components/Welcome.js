import React from "react";

import { Jumbotron, Row, Col } from "react-bootstrap";

export default function Welcome(props) {
  return (
    <Row>
      <Col lg={12} className={"margin-top"}>
        <Jumbotron className="bg-dark text-white">
          <h1>{props.heading}</h1>
          <blockquote className="blockquote mb-0">
            <p>{props.quote}</p>
            <footer className="blockquote-footer">{props.footer}</footer>
          </blockquote>
        </Jumbotron>
      </Col>
    </Row>
  );
}
