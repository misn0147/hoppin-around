import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import AuthContext from "../contexts/AuthContext";
import Error from "./Error";

function Login({userStatus}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const [, setUserStatus] = useContext(AuthContext);

    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:8080/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        // This code executes if the request is successful
        if (response.status === 200) {
            const { jwt } = await response.json();

            localStorage.setItem("token", jwt);
            setUserStatus({ user: jwtDecode(jwt) });
            history.push("/");
        } else if (response.status === 400) {
            const errors = await response.json();
            setErrors(errors);
        } else if (response.status === 403) {
            setErrors(["Login failed."]);
        } else {
            setErrors(["Unknown error."]);
        }
    };

    return (
        <div>
            {errors.map((error, i) => (
                <Error key={i} msg={error} />
            ))}
            
        <form onSubmit={handleSubmit}>
            <div className="container col-4">
            <h5>You must be logged in to hop around!</h5>
            <div className="mb-2">
                <label htmlFor="username" className="form-label">Username:</label>
                <input type="text" id="username" name="username" className="form-control form-color" required
                    onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div className="mb-2">
                <label htmlFor="password" className="form-label">Password:</label>
                <input type="password" id="password" name="password" className="form-control form-color" required
                    onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div>
                <Link to="/register" className="btn btn-secondary me-2">New User</Link>
                <button type="submit" className="btn btn-primary">Log In</button>
            </div>
            </div>
        </form>
        </div>
    );
}

export default Login;