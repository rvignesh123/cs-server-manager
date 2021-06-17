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
  ListGroup,
} from "react-bootstrap";
import { ROOT_URL } from "../../Context/actions";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import CheckMarkSuccess from "../../Components/CheckMarkSuccess";
import axios from "axios";
import {
  faArrowLeft,
  faArrowRight,
  faEye,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const QuickUtils = () => {
  const { status, runCommand } = useContext(GameContext);
  const [mapsList, setMapsList] = useState([]);
  const [quickCommandList, setQuickCommandList] = useState([]);
  const [singleSelections, setSingleSelections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showMapSuccess, setShowMapSuccess] = useState(false);
  const [showCommandSuccess, setCommandSuccess] = useState(false);
  const [activeCommand, setActiveCommand] = useState();

  const [ctList, setCTList] = useState([]);
  const [tList, setTList] = useState([]);
  const [specList, setSpecList] = useState([]);
  const [playerIndex, setPlayerIndex] = useState();
  const [playerType, setPlayerType] = useState();

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

  const fetchQuickCommands = async (e) => {
    axios
      .post(ROOT_URL + "/server/getQuickUtilCommands")
      .then((response) => response.data)
      .then((data) => {
        setQuickCommandList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPlayers = async (e) => {
    setLoading(true);
    axios
      .post(ROOT_URL + "/server/getCurrentPlayers")
      .then((response) => response.data)
      .then((data) => {
        setLoading(false);
        setCTList(data.ct);
        setTList(data.t);
        setSpecList(data.spec);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMapsList();
    fetchQuickCommands();
    fetchPlayers();
  }, []);

  const showErrorMessage = () => {
    return <h1>Please turn on the server to do this operation</h1>;
  };

  const activateMap = () => {
    setActiveCommand(-1);
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

  const customCommand = (command) => {
    setLoading(true);
    runCommand(command)
      .then(() => {
        setCommandSuccess(true);
        setLoading(false);
        setTimeout(() => {
          setCommandSuccess(false);
        }, 3 * 1000);
      })
      .catch(() => {
        setLoading(false);
        setShow(true);
      });
  };

  const quickCommand = (command, index) => {
    return (
      <>
        <Form.Group as={Row} controlId="formPlaintextPassword" key={index}>
          <Form.Label column sm="2">
            {command.label}
          </Form.Label>
          <Button
            variant="secondary"
            onClick={() => {
              setActiveCommand(index);
              customCommand(command.command);
            }}
            disabled={loading}
            className="quick-util-button"
          >
            {loading && activeCommand == index && (
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
            {showCommandSuccess && activeCommand == index && (
              <CheckMarkSuccess />
            )}
          </Col>
        </Form.Group>
      </>
    );
  };

  const applyTeamMoved = (player, type, index, originalType) => {
    if (type == 1) {
      tList.push(player);
      setTList(tList);
      ctList.splice(index, 1);
    } else if (type == 2) {
      ctList.push(player);
      setCTList(ctList);
      tList.splice(index, 1);
    } else {
      specList.push(player);
      if (originalType == 1) {
        ctList.splice(index, 1);
      } else {
        tList.splice(index, 1);
      }
      setSpecList(specList);
    }
    setLoading(false);
  };
  const moveTeam = (player, type, index, originalType) => {
    setLoading(true);
    var command = "";
    if (type == 1) {
      command = command + "amx_team_switch_t ";
    } else if (type == 2) {
      command = command + "amx_team_switch_ct ";
    } else if (type == 3) {
      command = command + "amx_team_switch_spec ";
    }
    command = command + player.id;
    runCommand(command)
      .then(() => {
        applyTeamMoved(player, type, index, originalType);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const playersList = (title, list, type) => {
    return (
      <>
        {" "}
        <Col xs={6} md={4}>
          <div>
            <h3>{title}</h3>
          </div>

          <ListGroup>
            {list.length == 0 ? (
              <ListGroup.Item variant="secondary">No Players</ListGroup.Item>
            ) : (
              <></>
            )}
            {list.map((eachPlayer, index) => (
              <ListGroup.Item
                action
                key={index}
                onClick={(e) => {
                  setPlayerIndex(index);
                  setPlayerType(type);
                }}
              >
                <div className="player-list-item mt-auto mb-auto">
                  {index == playerIndex && type == playerType ? (
                    <h4 className="active-player">{eachPlayer.name}</h4>
                  ) : (
                    <div>{eachPlayer.name}</div>
                  )}
                </div>
                {index == playerIndex && type == playerType ? (
                  <div className="list-button">
                    {type == 1 ? (
                      <Button
                        variant="secondary"
                        className="pull-right"
                        onClick={(e) => {
                          moveTeam(eachPlayer, type, index);
                        }}
                        disabled={loading}
                      >
                        <FontAwesomeIcon icon={faArrowRight} />
                      </Button>
                    ) : (
                      <></>
                    )}
                    {type == 2 ? (
                      <Button
                        variant="secondary"
                        className="pull-right"
                        onClick={(e) => {
                          moveTeam(eachPlayer, type, index);
                        }}
                        disabled={loading}
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </Button>
                    ) : (
                      <></>
                    )}

                    {type != 3 ? (
                      <Button
                        variant="secondary"
                        className="pull-right"
                        onClick={(e) => {
                          moveTeam(eachPlayer, 3, index, type);
                        }}
                        disabled={loading}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </>
    );
  };
  //amx_team_switch_ct 1
  const playerControl = () => {
    return (
      <>
        {" "}
        <Row>
          <Col>
            <h2 className="player-control">Player control</h2>
          </Col>
          <Col>
            <Button
              variant="secondary"
              className="list-button"
              disabled={loading}
              onClick={(e) => {
                fetchPlayers();
              }}
            >
              <FontAwesomeIcon icon={faSync} />
            </Button>
          </Col>
        </Row>
        <Row>
          {playersList("Counter Terrorist", ctList, 1)}
          {playersList("Terrorist", tList, 2)}
          {playersList("Spectators", specList, 3)}
        </Row>
      </>
    );
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
          {quickCommandList.map((eachCommand, index) =>
            quickCommand(eachCommand, index)
          )}
        </Form>
        {playerControl()}
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
