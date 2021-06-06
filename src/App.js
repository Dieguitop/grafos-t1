import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Editor from "./components/Editor.js";
import Header from "./components/Header.js";
import InitialPage from "./components/InitialPage.js";
import Documentation from "./components/Documentation.js";

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path='/' component={InitialPage} />
      <Route exact path='/dirigido' component={Main} />
      <Route exact path='/no-dirigido' component={MainNotDirected} />
      <Route exact path='/documentacion' component={Documentation} />
      <Redirect to='/' />
    </Switch>
    

  </BrowserRouter>

)

export default App;
