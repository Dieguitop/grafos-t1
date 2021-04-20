import React from 'react';
import { BrowserRouter, Redirect, Route} from 'react-router-dom'
import Main from './components/Main';
import Header from './components/Header';

const App = () => (
  <BrowserRouter>
    <Header />
    <Route exact path='/' component={Main} />
    <Redirect to="/" />
  </BrowserRouter>

)

export default App;
