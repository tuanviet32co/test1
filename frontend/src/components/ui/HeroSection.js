import React from 'react';
import Button from './Button';
import Logo from './Logo';
import '~/App.css';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <div className="hero-container">
            <Logo />
            {/* <p>What are you waiting for?</p> */}
            <h3>Suffer with you on this Fulbright journey 🤝 </h3>
            <div className="hero-btns">
                <Button
                    className="btns"
                    buttonStyle="btn--primary"
                    buttonSize="btn--large"
                    to='/'
                >
                    LOG IN
                </Button>
                <Button
                    className="btns"
                    buttonStyle="btn--outline"
                    buttonSize="btn--large"
                    onClick={console.log('hey')}
                >
                    EXPLORE MORE <i className="far fa-arrow-down" />
                </Button>
            </div>
        </div>
    );
}

export default HeroSection;
