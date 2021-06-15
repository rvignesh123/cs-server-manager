import React, { useState } from "react";

import { loginUser, useAuthState, useAuthDispatch } from "../../Context";
import Toast from "react-bootstrap/Toast";
import "./login.module.css";
import {
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUser,
  faLock,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useAuthDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response = await loginUser(dispatch, { username, password });
      if (!response.username) return;
      axios.interceptors.request.use(
        (config) => {
          config.headers.authorization = `${response.tokenType} ${response.accessToken}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      props.history.push("/");
    } catch (error) {
      setShow(true);
      console.log(error);
    }
  };

  return (
    <Row>
      <Col className="ml-auto mr-auto login-box" xs={5}>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          className="bg-danger"
        >
          <Toast.Header>
            <strong className="mr-auto">
              Bad credentials unable to log in
            </strong>
          </Toast.Header>
        </Toast>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Card.Header>
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faUser} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="user"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={"bg-dark text-white"}
                    placeholder="Enter User name"
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    autoComplete="off"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={"bg-dark text-white"}
                    placeholder="Enter Password"
                  />
                </InputGroup>
              </Form.Group>
            </Form.Row>
          </Card.Body>
          <Card.Footer style={{ "text-align": "right" }}>
            <Button
              size="sm"
              type="button"
              variant="success"
              onClick={(e) => handleLogin(e)}
            >
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Button>{" "}
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
