import React, { useEffect, useState } from 'react';
import SectionTitle from '../shared/SectionTitle';
import MenuItem from './MenuItem';
import { useMenu } from '../../hooks/useMenu';

const HomeMenuItem = () => {
    const [data, setData] = useState([]);
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <section className='w-[80%] mx-auto'>
            <SectionTitle title={'Check it out'} body={'FROM OUR MENU'} />
            <div className="grid mt-20 md:grid-cols-2 gap-7">
                {
                    popular.map(item => <MenuItem key={item._id} item={item} />)
                }
            </div>
        </section>
    );
};

export default HomeMenuItem;