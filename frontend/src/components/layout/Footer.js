import React from 'react';
// import { Button } from './Button';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.svg';
import credits from '~/assets/credits.svg';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>About Us</h2>
                        <Link to="/sign-up">How it works</Link>
                        <Link to="/">Testimonials</Link>
                        <Link to="/">Terms of Service</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>Contact Us</h2>
                        <Link to="/">Contact</Link>
                        <Link to="/">Support</Link>
                        <Link to="/">Donation</Link>
                    </div>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>Our Features</h2>
                        <Link to="/">Degree Tracking</Link>
                        <Link to="/">Major Tracking</Link>
                        <Link to="/">Course Browser</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>Social Media</h2>
                        <Link to="/">Facebook</Link>
                        <Link to="/">Instagram</Link>
                        <Link to="/">LinkedIn</Link>
                    </div>
                </div>
            </div>
            <div className="footer-links">
                <div className="footer-link-credits">
                    <h2>Built with ❤️‍🔥 by</h2>
                    <div className="footer-link-credits-items">
                        <img src={credits} width="360px" alt="credits" />
                    </div>
                </div>
            </div>
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        <Link to="/" className="social-logo">
                            <img src={logo} height="60px" alt="logo" />
                        </Link>
                    </div>
                    <small className="website-rights">Copyright © 2023 - Present, OneDegree</small>
                    <div className="social-icons">
                        <Link
                            className="social-icon-link facebook"
                            to="/"
                            target="_blank"
                            aria-label="Facebook"
                        >
                            <i className="fab fa-facebook-f" />
                        </Link>
                        <Link
                            className="social-icon-link instagram"
                            to="/"
                            target="_blank"
                            aria-label="Instagram"
                        >
                            <i className="fab fa-instagram" />
                        </Link>
                        <Link
                            className="social-icon-link linkedin"
                            to="/"
                            target="_blank"
                            aria-label="LinkedIn"
                        >
                            <i className="fab fa-linkedin" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;
