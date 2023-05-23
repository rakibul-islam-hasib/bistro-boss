import React from 'react';
import chefService from '../../assets/home/chef-service.jpg';

const ChefService = () => {
    return (
        <div className="md:w-[80%]  my-24 relative mx-auto">
            <img src={chefService} alt="" className="md:w-full h-[400px]" />
            <div className="absolute inset-4 md:inset-20 bg-white text-center flex flex-col justify-center items-center md:px-9">
                <h1 className="font-Cinzel text-4xl mb-4">Bistro Boss</h1>
                <p className="md:w-3/4 mx-auto">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quaerat modi quam hic non architecto saepe quos vitae laboriosam laborum reiciendis ab, voluptatem, accusamus iusto.
                </p>
            </div>
        </div>
    );
};

export default ChefService;
