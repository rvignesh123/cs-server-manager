import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import NavigationBar from "./components/NavigationBar";

function App() {
  const heading = "Welcome to CS Gaming server";
  const quote = "Good friends, good game, Have fun.";
  const footer = "Vignesh Rv";

  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} className={"margin-top"}>
            <Switch>
              <Route
                path="/"
                exact
                component={() => (
                  <Welcome heading={heading} quote={quote} footer={footer} />
                )}
              />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
