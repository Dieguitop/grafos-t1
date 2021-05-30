import React from 'react';
import { BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Main from './components/Main';
import Header from './components/Header';
import MainNotDirected from './components/MainNotDirected';
import InitialPage from './components/InitialPage';
import Documentation from './components/Documentation';

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
