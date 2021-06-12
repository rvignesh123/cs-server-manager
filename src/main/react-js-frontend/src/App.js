import React,{useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./Context";
import Sidebar from "./Components/Sidebar";
import Console from "./Pages/Manager/Console";
import GameContextProvider from "./Context/GameContextProvider";
import Home from "./Pages/Home";
import Maps from "./Pages/Manager/Maps";
import Login from "./Pages/Login";
import "./App.css";

function App() {
  const heading = "Welcome to CS Gaming server";
  const quote = "Good friends, good game, Have fun.";
  const footer = "Vignesh Rv";


  return (
    <AuthProvider>
      <Router>
        <Sidebar />
        <Container fluid>
          <Switch>
            <Route exact path="/">
              <Home heading={heading} quote={quote} footer={footer} />
            </Route>
            <Route path="/login" exact component={Login} />
            <GameContextProvider>

              <Route path="/manager" exact component={Console} />
              <Route path="/manager/console" exact component={Console} />
              <Route path="/manager/maps" exact component={Maps} />
            </GameContextProvider>
          </Switch>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
