import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMaps } from "../../service/index";

import { Jumbotron, Row, Col } from "react-bootstrap";
import axios from "axios";

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maps: [],
    };
  }

  componentDidMount() {
    this.fetchMaps();
  }

  fetchMaps() {
    axios
      .post("http://localhost:8080/maps/fetchMaps")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          maps: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { maps } = this.state;
    return (
      <Row>
        <Col lg={12} className={"margin-top"}>
          <Jumbotron className="bg-dark text-white">
            <h1>Maps Loader</h1>
            <blockquote className="blockquote mb-0">
              {maps.map((eachMap) => (
                <div>{eachMap.name}</div>
              ))}
              <footer className="blockquote-footer">End of maps</footer>
            </blockquote>
          </Jumbotron>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMaps: () => dispatch(fetchMaps()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Maps);
