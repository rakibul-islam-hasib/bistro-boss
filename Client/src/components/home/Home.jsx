import React from 'react';
import Slider from '../header/hero/Slider';
import CategoryCard from './CategoryCard/CategoryCard';
import ChefService from '../shared/ChefService';
import HomeMenuItem from '../MenuItem/HomeMenuItem';

const Home = () => {
    return (
        <div>
            <div className="">
                <Slider />
            </div>
            <CategoryCard />
            <ChefService />
            <HomeMenuItem />
        </div>
    );
};

export default Home;