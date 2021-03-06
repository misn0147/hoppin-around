import { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import StateSearch from "./components/StateSearch";
import Jumbotron from "./components/Jumbotron";
import AuthContext from "./contexts/AuthContext";
import CoordinateSearch from "./components/CoordinatesSearch";
import Home from "./components/Home";
import RandomBeer from "./components/RandomBeer";

function App() {
    const [userStatus, setUserStatus] = useState();

    return (
        <>
            <Router>
                <AuthContext.Provider value={[userStatus, setUserStatus]}>
                    <Jumbotron />
                    <NavBar />
                    <Switch>
                        <Route path="/login">
                            {userStatus?.user ? (
                                <Redirect to="/locationSearch" />
                            ) : (
                                <Login />
                            )}
                        </Route>
                        <Route path="/register">
                            {userStatus?.user ? (
                                <Redirect to="/locationSearch" />
                            ) : (
                                <Register />
                            )}
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/stateSearch">
                        {userStatus?.user ? (
                                <StateSearch />
                            ) : (
                                <Redirect to="/login" />
                            )}
                        </Route>
                        <Route path="/locationSearch">
                            {userStatus?.user ? (
                                <CoordinateSearch />
                            ) : (
                                <Redirect to="/login" />
                            )}
                        </Route>
                        <Route path="/randomBeer">
                            {userStatus?.user ? (
                                <RandomBeer />
                            ) : (
                                <Redirect to="/login" />
                            )}
                        </Route>
                    </Switch>
                </AuthContext.Provider>
            </Router>
        </>
    );
}

export default App;
