import {useState, useContext}  from "react";
import { useHistory, Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import AuthContext from "../contexts/AuthContext";

function Register() {

    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [err, setErr] = useState();
    const [, setUserStatus] = useContext(AuthContext);

    const history = useHistory();

    const onChange = (evt) => {
        const clone = { ...user };
        clone[evt.target.name] = evt.target.value;
        setUser(clone);
    };

    async function createUser(user) {
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(user)
        }
        let response = await fetch("http://localhost:8080/user/create", init);
        if (response.status === 201) {
            response = await fetch("http://localhost:8080/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password,
                }),
            });
            if (response.status === 200) {
                const { jwt } = await response.json();
                localStorage.setItem("token", jwt);
                setUserStatus({ user: jwtDecode(jwt) });
                return Promise.resolve();
            } else if (response.status === 400) {
                const errors = await response.json();
                setErr(errors);
            } else if (response.status === 403) {
                setErr(["Login failed."]);
            } else {
                setErr(["Unknown error."]);
            }
        } else if (response.status === 400) {
            const messages = await response.json();
            return Promise.reject({ status: response.status, messages });
        }
        return Promise.reject({ status: response.status });
    }

    const onSubmit = (evt) => {
        evt.preventDefault();
        if (user.password !== user.confirmPassword) {
            setErr("passwords do not match");
        } else {
            createUser(user)
                .then(() => history.push("/"))
                .catch((err) => {
                    if (err.status === 400) {
                        setErr(err.messages[0]);
                    } else {
                        history.push("/error", err.toString());
                    }
                });
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="container col-4">
                <h5>You must be logged in to hop around!</h5>
                <div className="mb-2">
                    <label htmlFor="username" className="form-label">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control form-color"
                        required
                        value={user.username}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="form-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control form-color"
                        required
                        value={user.password}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="form-label">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-control form-color"
                        required
                        value={user.confirmPassword}
                        onChange={onChange}
                    />
                </div>
                {err && <div className="alert alert-danger">{err}</div>}
                <div>
                    <Link to="/login" className="btn btn-secondary me-2">
                        Already have an account
                    </Link>
                    <button type="submit" className="btn btn-primary">
                        Log In
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Register;
