import React from 'react';
import Slider from '../header/hero/Slider';
import CategoryCard from './CategoryCard/CategoryCard';

const Home = () => {
    return (
        <div>
           <div className="">
           <Slider />
           </div>
           <CategoryCard />
        </div>
    );
};

export default Home;