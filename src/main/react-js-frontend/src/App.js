import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./Context";
import Sidebar from "./Components/Sidebar";
import GameContextProvider from "./Context/GameContextProvider";
import routes from "./Config/routes.js";
import AppRoute from "./Components/AppRoute";
import Home from "./Pages/Home";
import "./App.css";

function App() {
  const heading = "Welcome to CS Gaming server";
  const quote = "Good friends, good game, Have fun.";
  const footer = "Vignesh Rv";

  return (
    <AuthProvider>
      <Router>
        <Sidebar />
        <Container fluid className={"page-margin-top"}>
          <Switch>
            <Route exact path="/">
              <Home heading={heading} quote={quote} footer={footer} />
            </Route>
            <GameContextProvider>
              {routes.map((route) => (
                <AppRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  isPrivate={route.isPrivate}
                />
              ))}
            </GameContextProvider>
          </Switch>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
