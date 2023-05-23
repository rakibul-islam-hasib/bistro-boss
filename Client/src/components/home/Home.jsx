import React from 'react';
import Slider from '../header/hero/Slider';
import CategoryCard from './CategoryCard/CategoryCard';
import ChefService from '../shared/ChefService';
import HomeMenuItem from '../MenuItem/HomeMenuItem';
import FeaturedItem from './Featured/FeaturedItem';
import Testimonials from './testimonials/Testimonials';

const Home = () => {
    return (
        <div>
            <div className="">
                <Slider />
            </div>
            <CategoryCard />
            <ChefService />
            <HomeMenuItem />
            <FeaturedItem />
            <Testimonials />
        </div>
    );
};

export default Home;