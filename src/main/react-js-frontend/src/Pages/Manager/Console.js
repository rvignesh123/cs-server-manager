import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import {
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
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { GameContext } from "../../Context/GameContextProvider";

export default function Console(props) {
  const fitAddon = new FitAddon();
  const xtermRef = React.useRef(null);
  const [command, setCommand] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const { status, setStatus, log, getServerStatus, runCommand, totalCount } =
    useContext(GameContext);

  React.useEffect(() => {
    getServerStatus();
    xtermRef.current.terminal.reset();
    fitAddon.fit();
  }, []);

  React.useEffect(() => {
    xtermRef.current.terminal.writeln(log);
  }, [log]);

  useEffect(() => {
    setButtonStatus(status);
    const interval = setInterval(() => {
      console.log("Triggered Timer" + status);
      if (status) {
        console.log("Calling server method");
        getServerStatus();
      }
    }, 5 * 1000);

    return () => clearInterval(interval);
  }, [status]);

  const updateServer = (checked) => {
    setButtonStatus(checked);
    axios
      .get("http://localhost:8080/server/updateServer?status=" + checked)
      .then((response) => response.data)
      .then((data) => {
        setStatus(data);
        setButtonStatus(data);
      })
      .catch((error) => {
        console.log(error);
        setStatus(false);
      });
  };

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
              <BootstrapSwitchButton
                checked={buttonStatus}
                onstyle="success"
                offstyle="outline-danger"
                onChange={(checked) => {
                  updateServer(checked);
                }}
              />
            </Row>

            <XTerm ref={xtermRef} addons={[fitAddon]} className="margin-top" />
            <InputGroup className="mb-3">
              <FormControl
                required
                placeholder="Execute a command"
                aria-label="Execute a command"
                aria-describedby="basic-addon2"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={() => {
                  runCommand(command);
                }}
              >
                Run
              </Button>
            </InputGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
