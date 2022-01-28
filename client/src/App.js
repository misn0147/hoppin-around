import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Jumbotron from './components/Jumbotron';

function App(){
    return (
      <>
      <Router>
        <Jumbotron />
            <NavBar />
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
      </>
      );
}

export default App;