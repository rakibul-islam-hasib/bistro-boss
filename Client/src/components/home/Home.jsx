import React from 'react';
import Slider from '../header/hero/Slider';
import CategoryCard from './CategoryCard/CategoryCard';
import ChefService from '../shared/ChefService';

const Home = () => {
    return (
        <div>
           <div className="">
           <Slider />
           </div>
           <CategoryCard />
           <ChefService />
        </div>
    );
};

export default Home;