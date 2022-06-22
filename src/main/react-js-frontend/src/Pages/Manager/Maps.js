import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "../../Context/GameContextProvider";
import {
  Jumbotron,
  Row,
  Col,
  Form,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ROOT_URL } from "../../Context/actions";
import axios from "axios";
import CheckMarkSuccess from "../../Components/CheckMarkSuccess";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const Maps = () => {
  const { status, runCommand } = useContext(GameContext);
  const [maps, setMaps] = useState([]);
  const [activeCard, setActiveCard] = useState();
  const [resourceFile, setResourceFile] = useState(undefined);
  const [showMapSuccess, setShowMapSuccess] = useState(false);
  const [showMapUploadSuccess, setshowMapUploadSuccess] = useState(false);

  const fetchMaps = async (e) => {
    axios
      .post(ROOT_URL + "/maps/fetchMaps")
      .then((response) => response.data)
      .then((data) => {
        setMaps(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMaps();
  }, []);

  const showErrorMessage = () => {
    return <h1>Please turn on the server to see the maps</h1>;
  };

  const setCardActive = (cardNumber) => {
    setShowMapSuccess(false);
    setActiveCard(cardNumber);
  };

  const activateMap = (map) => {
    runCommand("changelevel " + map.name)
      .then(() => {
        setShowMapSuccess(true);
      })
      .catch(() => {});
  };

  const deleteMap = (map) => {
    axios
      .post(ROOT_URL + "/maps/deleteMap", { map: map.name })
      .then((response) => response.data)
      .then((data) => {
        setMaps(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadMap = (event) => {
    event.preventDefault();
    const url = ROOT_URL + "/maps/uploadMap";
    const formData = new FormData();
    formData.append("file", resourceFile);
    console.log("boundary:", formData._boundary);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(url, formData, config)
      .then((response) => response.data)
      .then((data) => {
        setMaps(data);
        setshowMapUploadSuccess(true);
      });
  };

  const onChangeResource = (event) => {
    setResourceFile(event.target.files[0]);
  };

  const mapImages = (map, index) => {
    return (
      <>
        <Col className="card-style" key={index}>
          <Card
            style={{ width: "282px" }}
            onClick={(e) => setCardActive(index)}
          >
            <LazyLoadImage
              src={ROOT_URL + "/" + map.preview} // use normal <img> attributes as props
              width={280}
              height={160}
            />

            <Card.Body className="bg-dark">
              <Card.Title>{map.name}</Card.Title>
              {activeCard == index ? (
                <>
                  <Row className="map-card-button">
                    <Button variant="primary" onClick={(e) => activateMap(map)}>
                      Play now
                    </Button>
                    <Col className="mt-auto mb-auto">
                      {showMapSuccess && <CheckMarkSuccess />}
                    </Col>
                    <Button variant="danger" onClick={(e) => deleteMap(map)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Row>
                </>
              ) : (
                ""
              )}
            </Card.Body>
          </Card>
        </Col>
      </>
    );
  };

  return (
    <Jumbotron className="bg-dark text-white">
      {status ? (
        <>
          <h1>Maps Loader</h1>{" "}
          <Form onSubmit={uploadMap}>
            <Form.Group>
              <Alert variant="info">
                Upload any zip file contains structure similar to CSTRIKE folder
                <br></br>Zip file should contains following structure
                <br></br>maps/
                <br></br>MapPreview/
                <br></br>Other required files
                <br></br>Map preview should be named as MapName.png or jpg or
                webp and preview would be displayed here
              </Alert>
              <Alert variant="danger">
                Upload Properly - You might upload unnecessary files
                <br></br>*** You are responsible for any damage to server ***
              </Alert>
              <Alert variant="success">
                <a href="http://15.206.27.117/ServerResourceList/downloads/example_dustyfortress.zip">
                  Download - Map example - dustyFortress
                </a>
              </Alert>
              <Alert variant="secondary">
                <Row>
                  <Form.File
                    id="map-upload"
                    accept=".zip"
                    onChange={onChangeResource}
                  />
                  <Col>
                    <Button
                      variant="secondary"
                      type="submit"
                      disabled={!resourceFile}
                    >
                      Upload
                    </Button>
                  </Col>
                  <Col className="mt-auto mb-auto">
                    {showMapUploadSuccess && <CheckMarkSuccess />}
                  </Col>
                </Row>
              </Alert>
            </Form.Group>
          </Form>
          <Row>{maps.map((eachMap, index) => mapImages(eachMap, index))}</Row>{" "}
        </>
      ) : (
        showErrorMessage()
      )}
    </Jumbotron>
  );
};
export default Maps;
