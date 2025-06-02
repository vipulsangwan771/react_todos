import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    const handleNavLinkClick = () => {
        const collapseElement = document.getElementById('navbarSupportedContent');
        if (collapseElement && collapseElement.classList.contains('show')) {
            new window.bootstrap.Collapse(collapseElement).hide();
        }
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">{props.title}</NavLink>
                <button
                    className="navbar-toggler shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                to="/" onClick={handleNavLinkClick}
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'text-primary fw-semibold' : 'text-dark'}`
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/todos" onClick={handleNavLinkClick}
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'text-primary fw-semibold' : 'text-dark'}`
                                }
                            >
                                Todos
                            </NavLink>
                        </li>
                    </ul>

                    {props.searchBar && (
                        <form className="d-flex">
                            <input
                                className="form-control me-2 shadow-none"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success shadow-none" type="submit">
                                Search
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
