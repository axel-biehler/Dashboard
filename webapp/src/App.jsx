import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginPage, LogoutPage, RegisterPage } from './pages';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <p>Hi</p>
      </Route>
      <Route path="/home">
        <p>Home</p>
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/logout">
        <LogoutPage />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
