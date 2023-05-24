import React, { useEffect, useState } from 'react';
import PageCover from '../../shared/PageCover';
import menuBg from '../../../assets/menu/banner3.jpg';
import { useMenu } from '../../../hooks/useMenu';
import desertBg from '../../../assets/menu/dessert-bg.jpeg'
import MenuCategory from './MenuCategory';
import SectionCover from '../../shared/SectionCover';
const Menu = () => {
    const [menu] = useMenu();
    const offered = menu.filter(item => item.category === 'offered');
    const dessert = menu.filter(item => item.category === 'dessert').slice(0, 4);
    return (
        <div>
            <PageCover img={menuBg} />
            <MenuCategory item={offered} />
            {/* <div className="mt-24"></div> */}
            <SectionCover  title='dessert' subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} img={desertBg} />
            <MenuCategory  item={dessert} />
        </div>
    );
};

export default Menu;