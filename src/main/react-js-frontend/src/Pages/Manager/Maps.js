import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "../../Context/GameContextProvider";
import { Jumbotron, Row, Col, Image, Card, Button } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
const Maps = () => {
  const { status } = useContext(GameContext);
  const [cardSelected, setCardSelected] = useState(false);
  const [maps, setMaps] = useState([]);

  const fetchMaps = async (e) => {
    axios
      .post("http://localhost:8080/maps/fetchMaps")
      .then((response) => response.data)
      .then((data) => {
        setMaps(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(status);
    fetchMaps();
  }, []);

  const mapImages = (map) => {
    return (
      <>
        <Col className="card-style">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="http://localhost:8080/ServerResourceList/MapPreview/828_aztec.jpg"
            />
            <Card.Body className="bg-dark">
              <Card.Title>{map.name}</Card.Title>
              <Button variant="primary">Play now</Button>
            </Card.Body>
          </Card>
        </Col>
      </>
    );
  };

  return (
    <Jumbotron className="bg-dark text-white margin-top">
      <h1>Maps Loader</h1>
      <Row>{maps.map((eachMap) => mapImages(eachMap))}</Row>
    </Jumbotron>
  );
};
export default Maps;
