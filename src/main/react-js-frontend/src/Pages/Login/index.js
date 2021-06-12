import React, { useState } from 'react';

import { loginUser, useAuthState, useAuthDispatch } from '../../Context';
import styles from './login.module.css';
import {Row, Col, Card, Form, InputGroup, FormControl, Button, Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSignInAlt, faUser, faLock, faUndo} from "@fortawesome/free-solid-svg-icons";

function Login(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error,setError] = useState(undefined);

	const dispatch = useAuthDispatch();
	const { loading, errorMessage } = useAuthState();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			let response = await loginUser(dispatch, { username, password });
            console.log(response)
			if (!response.user) return;
			props.history.push('/dashboard');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Row className="justify-content-md-center margin-top">
                <Col xs={5}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={faSignInAlt}/> Login
                        </Card.Header>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="text" name="user" value={username} onChange={(e) => setUsername(e.target.value)}
                                            className={"bg-dark text-white"} placeholder="Enter User name"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                            className={"bg-dark text-white"} placeholder="Enter Password"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"text-align":"right"}}>
                            <Button size="sm" type="button" variant="success" onClick={(e) => handleLogin(e)}
                               >
                                <FontAwesomeIcon icon={faSignInAlt}/> Login
                            </Button>{' '}
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
	);
}

export default Login;
