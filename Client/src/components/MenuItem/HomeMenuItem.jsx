import React, { useEffect, useState } from 'react';
import SectionTitle from '../shared/SectionTitle';
import MenuItem from './MenuItem';

const HomeMenuItem = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(result => {
                const popularItem = result.filter(item => item.category === 'popular');
                setData(popularItem)
            })
    }, [])
    
    return (
        <section className='w-[80%] mx-auto'>
            <SectionTitle title={'Check it out'} body={'FROM OUR MENU'} />
            <div className="grid mt-20 md:grid-cols-2 gap-7">
                {
                    data.map(item => <MenuItem key={item._id} item={item} />)
                }
            </div>
        </section>
    );
};

export default HomeMenuItem;