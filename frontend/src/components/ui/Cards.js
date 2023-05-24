import React from 'react';
import CardItem from './CardItem';
import degree_demo from '~/assets/degree_demo.png'
import major_demo from '~/assets/major_demo.png'
import courses_demo from '~/assets/courses_demo.png'
import './Cards.css';

const Cards = () => {
    return (
        <div className="cards">
            <h1>Let's take a <span style={{color:"#55ab89"}}>One</span>Degree tour 💁‍♀️</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                            src={degree_demo}
                            text="A centralized dashboard that monitors your academic performance. Reflective messages that help you stay motivated and engaged in your study."
                            slogan="Easier than ever."
                            label="Degree"
                            path="/"
                        />
                    </ul>
                </div>
            </div>
           
            
            <h1>Don't open 10 tabs, we have <span style={{color:"#55ab89"}}>all in 1</span> 👀</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                            src={major_demo}
                            text="Track your major progress by comparing to the flowchart. Explore what-if scenarios if you decide to switch major."
                            slogan="Easier than ever."
                            label="Degree"
                            path="/"
                        />
                    </ul>
                </div>
            </div>
            
            <h1>Looks stressful as usual, <span style={{color:"#55ab89"}}>but prettier</span> 🤭</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                            src={courses_demo}
                            text="Add. Drop. Browse your favorite courses. Your major GPA can now be calculated."
                            label="Degree"
                            slogan="Easier than ever."
                            path="/"
                        />
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;
