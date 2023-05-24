import React from 'react';
import SectionTitle from '../../shared/SectionTitle';
import MenuItem from '../../MenuItem/MenuItem';

const MenuCategory = ({ item = [], sTitle, sBody, btn = 'ORDER YOUR FAVOURITE FOOD' }) => {
    return (
        <>
            <div className="my-16">
                {sTitle && <SectionTitle title={sTitle} body={sBody} />}
            </div>
            <div className="grid my-8 w-[80%] mx-auto gap-10 md:grid-cols-2">
                {
                    item.map(item => <MenuItem key={item._id} item={item} />)
                }
            </div>
            <div className="text-center mt-5">
                <button className='px-10 py-3 uppercase text-black hover:bg-black hover:text-white  duration-500 border-b-4 border-b-black rounded-xl'>{btn}</button>
            </div>
        </>
    );
};

export default MenuCategory;