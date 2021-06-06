import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Editor from "./components/Editor.js";
import Header from "./components/Header.js";
import InitialPage from "./components/InitialPage.js";
import Documentation from "./components/Documentation.js";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={InitialPage} />
        <Route
          exact
          path="/dirigido"
          render={() => <Editor isDirected={true} />}
        />
        <Route
          exact
          path="/no-dirigido"
          render={() => <Editor isDirected={false} />}
        />
        <Route exact path="/documentacion" component={Documentation} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}
