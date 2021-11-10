import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginPage, RegisterPage } from './pages';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <p>Hi</p>
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/logout">
        <p>Logout</p>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
