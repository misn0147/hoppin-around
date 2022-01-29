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
import Home from "./components/Home";
import Jumbotron from "./components/Jumbotron";
import AuthContext from "./contexts/AuthContext";
import CoordinateSearch from "./components/CoordinatesSearch";

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
                            {userStatus?.user ? <Redirect to="/" /> : <Login />}
                        </Route>
                        <Route path="/register">
                            {userStatus?.user ? (
                                <Redirect to="/" />
                            ) : (
                                <Register />
                            )}
                        </Route>
                        <Route exact path="/">
                            {userStatus?.user ? (
                                <Home />
                            ) : (
                                <Redirect to="/login" />
                            )}
                        </Route>
                        <Route path="/locationSearch">
                          <CoordinateSearch />
                        </Route>
                    </Switch>
                </AuthContext.Provider>
            </Router>
        </>
    );
}

export default App;
