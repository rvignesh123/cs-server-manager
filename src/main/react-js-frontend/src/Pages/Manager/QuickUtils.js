import React, { useContext, useState, useEffect, useRef } from "react";
import { GameContext } from "../../Context/GameContextProvider";
import {
  Jumbotron,
  Row,
  Col,
  Image,
  Card,
  Button,
  Spinner,
  Toast,
  Form,
} from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ROOT_URL } from "../../Context/actions";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import CheckMarkSuccess from "../../Components/CheckMarkSuccess";
import axios from "axios";
const QuickUtils = () => {
  const { status, runCommand } = useContext(GameContext);
  const [mapsList, setMapsList] = useState([]);
  const [singleSelections, setSingleSelections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showMapSuccess, setShowMapSuccess] = useState(false);
  const [showPauseSuccess, setPauseSuccess] = useState(false);
  const [showRoundRestartSucess, setRoundRestartSuccess] = useState(false);

  const fetchMapsList = async (e) => {
    axios
      .post(ROOT_URL + "/maps/mapList")
      .then((response) => response.data)
      .then((data) => {
        setMapsList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMapsList();
  }, []);

  const showErrorMessage = () => {
    return <h1>Please turn on the server to do this operation</h1>;
  };

  React.useEffect(() => {
    console.log(status);
  }, [status]);

  const activateMap = () => {
    setLoading(true);
    runCommand("changelevel " + singleSelections[0])
      .then(() => {
        setShowMapSuccess(true);
        setLoading(false);
        setTimeout(() => {
          setShowMapSuccess(false);
        }, 3 * 1000);
      })
      .catch(() => {
        setLoading(false);
        setShow(true);
      });
  };

  const customCommand = (command, successFunction) => {
    setLoading(true);
    runCommand(command)
      .then(() => {
        successFunction(true);
        setLoading(false);
        setTimeout(() => {
          successFunction(false);
        }, 3 * 1000);
      })
      .catch(() => {
        setLoading(false);
        setShow(true);
      });
  };

  const quickUtils = () => {
    return (
      <>
        {" "}
        <h1>Quick Utils</h1>
        <Form className="margin-top">
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Change Map
            </Form.Label>

            <Col sm="4">
              <Typeahead
                id="basic-typeahead-single"
                labelKey="name"
                onChange={setSingleSelections}
                options={mapsList}
                placeholder="Try entering map names..."
                selected={singleSelections}
              />
            </Col>
            <Col>
              <Row>
                <Button
                  variant="secondary"
                  onClick={activateMap}
                  disabled={loading}
                  className="quick-util-button"
                >
                  {loading && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  <span className="visually-hidden"> Set Map</span>
                </Button>
                <Col className="mt-auto mb-auto">
                  {showMapSuccess && <CheckMarkSuccess />}
                </Col>
              </Row>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Pause / Unpause
            </Form.Label>
            <Button
              variant="secondary"
              onClick={() => {
                customCommand("amx_pause", setPauseSuccess);
              }}
              disabled={loading}
              className="quick-util-button"
            >
              {loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              <span className="visually-hidden"> Send Command</span>
            </Button>
            <Col className="mt-auto mb-auto">
              {showPauseSuccess && <CheckMarkSuccess />}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Restart Round
            </Form.Label>
            <Button
              variant="secondary"
              onClick={() => {
                customCommand("amx_restart", setRoundRestartSuccess);
              }}
              disabled={loading}
              className="quick-util-button"
            >
              {loading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              <span className="visually-hidden"> Send Command</span>
            </Button>
            <Col className="mt-auto mb-auto">
              {showRoundRestartSucess && <CheckMarkSuccess />}
            </Col>
          </Form.Group>
        </Form>
      </>
    );
  };
  return (
    <>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        className="bg-danger"
      >
        <Toast.Header>
          <strong className="mr-auto">
            Unable to perform operation right now
          </strong>
        </Toast.Header>
      </Toast>
      <Jumbotron className="bg-dark text-white">
        {status ? quickUtils() : showErrorMessage()}
      </Jumbotron>
    </>
  );
};
export default QuickUtils;
