import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import jwtDecode from "jwt-decode";

function NavBar() {
    const [userStatus, setUserStatus] = useContext(AuthContext);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUserStatus({ user: jwtDecode(token) });
        }
    }, [setUserStatus]);

    return (
        <>
            <nav className="navbar navbar-expand-lg nav-color">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon">
                        <i className="fas fa-beer"></i>
                    </span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavAltMarkup"
                >
                    <div className="navbar-nav mr-auto">
                        <span className="nav-item">
                            <Link to="/" className="nav-link mx-auto h5">
                                Home
                            </Link>
                        </span>
                        <span className="nav-item">
                            <Link
                                to="/stateSearch"
                                className="nav-link mx-auto h5"
                            >
                                Search by State
                            </Link>
                        </span>
                        <span className="nav-item">
                            <Link
                                to="/locationSearch"
                                className="nav-link mx-auto h5"
                            >
                                Search by City
                            </Link>
                        </span>
                        {userStatus ? 
                            <>
                            <span className="nav-item">
                                    <span
                                        onClick={() => {
                                            setUserStatus(null);
                                            localStorage.removeItem("token");
                                        }}
                                        className="nav-link mx-auto h5"
                                    >
                                        Log Out
                                    </span>
                                </span>
                                </>
                        : 
                            <>
                                <span className="nav-item">
                                    <Link
                                        to="/login"
                                        className="nav-link mx-auto h5"
                                    >
                                        Login
                                    </Link>
                                </span>
                                <span className="nav-item">
                                    <Link
                                        to="/register"
                                        className="nav-link mx-auto h5"
                                    >
                                        Register
                                    </Link>
                                </span>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </>
    );
}
export default NavBar;
