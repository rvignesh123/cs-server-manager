import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Welcome from "./components/Welcome";
import NavigationBar from "./components/NavigationBar";
import Manager from "./components/Manager/Manager";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";

function App() {
  const heading = "Welcome to CS Gaming server";
  const quote = "Good friends, good game, Have fun.";
  const footer = "Vignesh Rv";

  return (
    <Router>
      <NavigationBar />
      <Container fluid>
        <Switch>
          <Route exact path="/">
            <Welcome heading={heading} quote={quote} footer={footer} />
          </Route>
          <Route path="/manager">
            <Manager />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
