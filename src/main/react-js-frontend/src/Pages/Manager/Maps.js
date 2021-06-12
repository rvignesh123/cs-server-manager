import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "../../Context/GameContextProvider";
import { Jumbotron, Row, Col, Image, Card, Button } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
const Maps = () => {
  const { status } = useContext(GameContext);
  const [cardSelected, setCardSelected] = useState(false);
  const [maps, setMaps] = useState([]);
  const [activeCard , setActiveCard] = useState();


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
    fetchMaps();
  }, []);


  const showErrorMessage = ()=>{
    return <h1>Please turn on the server to see the maps</h1>;
  }


  React.useEffect(() => {
    console.log(status);
  },[status]);

  const setCardActive=(cardNumber)=>{
    setActiveCard(cardNumber);
  }

  const activateMap=(map)=>{
    console.log(map);
  }

  const mapImages = (map,index) => {
    return (
      <>
        <Col className="card-style" key={index}>
          <Card style={{ width: "18rem" }} onClick={(e)=>setCardActive(index)}>
            <Card.Img
              variant="top"
              src="http://localhost:8080/ServerResourceList/MapPreview/de_dust.png"
            />
            <Card.Body className="bg-dark">
              <Card.Title>{map.name}</Card.Title>
              {activeCard == index ? <Button variant="primary" onClick={(e)=>activateMap(map)}>Play now</Button> : ""}
            </Card.Body>
          </Card>
        </Col>
      </>
    );
  };

  return (
    <Jumbotron className="bg-dark text-white margin-top">
      {status ? <><h1>Maps Loader</h1> <Row>{maps.map((eachMap,index) => mapImages(eachMap,index))}</Row> </>: showErrorMessage() }
      
    </Jumbotron>
  );
};
export default Maps;
