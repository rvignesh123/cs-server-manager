import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import {
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { XTerm } from "xterm-for-react";
import { FitAddon } from "xterm-addon-fit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { GameContext } from "../../Context/GameContextProvider";
import Toast from "react-bootstrap/Toast";
import { ROOT_URL } from "../../Context/actions";

export default function Console(props) {
  const fitAddon = new FitAddon();
  const xtermRef = React.useRef(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [command, setCommand] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const {
    status,
    setStatus,
    log,
    getServerStatus,
    runCommand,
    totalCount,
    setLog,
  } = useContext(GameContext);

  React.useEffect(() => {
    getServerStatus(0);
    setLog("");
    xtermRef.current.terminal.reset();
    fitAddon.fit();
  }, []);

  React.useEffect(() => {
    xtermRef.current.terminal.writeln(log);
  }, [log]);

  useEffect(() => {
    setButtonStatus(status);
    if (status) {
      loopServer(totalCount);
    } else {
      xtermRef.current.terminal.reset();
      setLog("");
    }
  }, [status]);

  const updateServer = (checked) => {
    setButtonStatus(checked);
    setLoading(true);
    axios
      .get(ROOT_URL + "/server/updateServer?status=" + checked)
      .then((response) => response.data)
      .then((data) => {
        setStatus(data);
        setButtonStatus(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setStatus(false);
        setLoading(false);
        setMessage("Server start/stop operation failed.");
        setShow(true);
        setButtonStatus(!checked);
      });
  };

  const loopServer = (lineCount) => {
    if (status) {
      getServerStatus(lineCount).then(function (data) {
        setTimeout(() => {
          if (status) {
            loopServer(data.lineCount);
          }
        }, 5 * 1000);
      });
    }
  };

  return (
    <Row>
      <Col lg={12}>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          className="bg-danger"
        >
          <Toast.Header>
            <strong className="mr-auto">{message}</strong>
          </Toast.Header>
        </Toast>
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
                disabled={loading}
              />
            </Row>

            <XTerm ref={xtermRef} addons={[fitAddon]} className="margin-top" />
            <InputGroup className="mb-3 margin-top">
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
                  setCommand("");
                }}
                disabled={!status}
              >
                Run
              </Button>
            </InputGroup>
          </Card.Body>
        </Card>
      </Col>
      <Row></Row>
    </Row>
  );
}
