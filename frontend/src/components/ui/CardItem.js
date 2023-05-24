import React from 'react';
import { Link } from 'react-router-dom';

const CardItem = (props) => {
    const { path, label, src, text, slogan } = props;
    return (
        <>
            <li className="cards__item">
                <Link className="cards__item__link" to={path}>
                    <figure
                        className="cards__item__pic-wrap"
                        data-category={label}
                    >
                        <img className="cards__item__img" src={src} alt="something"/>
                    </figure>
                    <div className="cards__item__info">
                        <h5 className="cards__item__text">
                            {text}{' '}
                            <span style={{ color: '#55ab89' }}>{slogan}</span>
                        </h5>
                    </div>
                </Link>
            </li>
        </>
    );
};

export default CardItem;
