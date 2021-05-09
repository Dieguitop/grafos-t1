import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import Main from './components/Main';
import Header from './components/Header';

const App = () => (
  <BrowserRouter>
    <Header />
    <Route exact path='/' component={Main} />
  </BrowserRouter>

)

export default App;
