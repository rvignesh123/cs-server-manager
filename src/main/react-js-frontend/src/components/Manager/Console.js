import React from "react";

import {
  Jumbotron,
  Row,
  Col,
  Card,
  ButtonToolbar,
  Button,
  ButtonGroup,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { XTerm } from "xterm-for-react";
import { FitAddon } from "xterm-addon-fit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDraftingCompass,
  faSignInAlt,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";

export default function Console(props) {
  const fitAddon = new FitAddon();
  const xtermRef = React.useRef(null);

  React.useEffect(() => {
    // You can call any method in XTerm.js by using 'xterm xtermRef.current.terminal.[What you want to call]
    xtermRef.current.terminal.writeln("Hello, World!");
  }, []);

  return (
    <Row>
      <Col lg={12} className={"margin-top"}>
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <div>
                  <h3>
                    {" "}
                    <FontAwesomeIcon icon={faTerminal} /> Server Console
                  </h3>
                </div>
              </Col>
              <Col xs lg="2">
                <ButtonToolbar aria-label="Toolbar with button groups">
                  <ButtonGroup className="me-2" aria-label="First group">
                    <Button>Start</Button> <Button>Stop</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
            </Row>

            <XTerm ref={xtermRef} addons={[fitAddon]} />
            <InputGroup className="mb-3">
              <FormControl
                required
                placeholder="Execute a command"
                aria-label="Execute a command"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">
                Run
              </Button>
            </InputGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
