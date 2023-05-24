import React, { useEffect, useState } from 'react';
import PageCover from '../../shared/PageCover';
import menuBg from '../../../assets/menu/banner3.jpg';
import SectionTitle from '../../shared/SectionTitle';
import { useMenu } from '../../../hooks/useMenu';
import MenuItem from '../../MenuItem/MenuItem';
const Menu = () => {
    const [menu] = useMenu();
    const offered = menu.filter(item => item.category === 'offered');
    return (
        <div>
            <PageCover img={menuBg} />
            <div className="my-16">
                <SectionTitle title={`Don't miss`} body={`TODAY'S OFFER`} />
            </div>
            <div className="grid w-[80%] mx-auto gap-10 md:grid-cols-2">
                {
                    offered.map(item => <MenuItem key={item._id} item={item} />)
                }
            </div>
        </div>
    );
};

export default Menu;