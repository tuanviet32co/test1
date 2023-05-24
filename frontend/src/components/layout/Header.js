import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.svg';
import './Header.css';

const Header = () => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link
                        to="/"
                        className="navbar-logo"
                        onClick={closeMobileMenu}
                    >
                        <img src={logo} height="60px" alt="logo" />
                    </Link>

                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>

                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li>
                            <Link
                                to="/sign-in"
                                className="nav-links-mobile"
                                onClick={closeMobileMenu}
                            >
                                LOG IN
                            </Link>
                            <Link
                                to="/sign-up"
                                className="nav-links-mobile"
                                onClick={closeMobileMenu}
                            >
                                SIGN UP
                            </Link>
                        </li>
                    </ul>
                    {button && (
                        <div>
                            <Link
                                to="/sign-in"
                                style={{ marginRight: 40 }}
                            >
                                LOG IN
                            </Link>
                            <Link
                                to="/sign-up"
                            >
                                SIGN UP
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Header;
