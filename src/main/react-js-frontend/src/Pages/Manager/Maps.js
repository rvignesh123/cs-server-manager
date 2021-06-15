import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "../../Context/GameContextProvider";
import { Jumbotron, Row, Col, Image, Card, Button } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ROOT_URL } from "../../Context/actions";
import axios from "axios";
import CheckMarkSuccess from "../../Components/CheckMarkSuccess";
const Maps = () => {
  const { status, runCommand } = useContext(GameContext);
  const [maps, setMaps] = useState([]);
  const [activeCard, setActiveCard] = useState();
  const [showMapSuccess, setShowMapSuccess] = useState(false);

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

  const mapImages = (map, index) => {
    return (
      <>
        <Col className="card-style" key={index}>
          <Card
            style={{ width: "18rem" }}
            onClick={(e) => setCardActive(index)}
          >
            <LazyLoadImage
              alt={ROOT_URL + "/ServerResourceList/MapPreview/default.svg"}
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
          <Row>{maps.map((eachMap, index) => mapImages(eachMap, index))}</Row>{" "}
        </>
      ) : (
        showErrorMessage()
      )}
    </Jumbotron>
  );
};
export default Maps;
