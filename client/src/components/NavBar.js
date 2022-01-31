import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
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
                            <Link to="/" className="nav-link mx-auto">
                                Search by State
                            </Link>
                        </span>
                        <span className="nav-item">
                            <Link
                                to="/locationSearch"
                                className="nav-link mx-auto"
                            >
                                Search by City
                            </Link>
                        </span>
                        <span className="nav-item">
                            <Link to="/login" className="nav-link mx-auto">
                                Login
                            </Link>
                        </span>
                        <span className="nav-item">
                            <Link to="/register" className="nav-link mx-auto">
                                Register
                            </Link>
                        </span>
                    </div>
                </div>
            </nav>
        </>
    );
}
export default NavBar;
