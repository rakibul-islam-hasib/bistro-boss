import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageCover from '../../shared/PageCover';
import menuBg from '../../../assets/menu/banner3.jpg';
import { useMenu } from '../../../hooks/useMenu';
import desertBg from '../../../assets/menu/dessert-bg.jpeg'
import saladBg from '../../../assets/menu/salad-bg.jpg';
import soupBg from '../../../assets/menu/soup-bg.jpg';
import pizzaBg from '../../../assets/menu/pizza-bg.jpg';
import MenuCategory from './MenuCategory';
import SectionCover from '../../shared/SectionCover';
import SectionTitle from '../../shared/SectionTitle';
const Menu = () => {
    const navigate = useNavigate();
    const [menu] = useMenu();
    const offered = menu.filter(item => item.category === 'offered');
    const dessert = menu.filter(item => item.category === 'dessert').slice(0, 4);
    const salad = menu.filter(item => item.category === 'salad').slice(0, 4);
    const soup = menu.filter(item => item.category === 'soup').slice(0, 4);
    const pizza = menu.filter(item => item.category === 'pizza').slice(0, 4);
    return (
        <div>
            <PageCover img={menuBg} />
            <div className="my-12"></div>
            <SectionTitle title="Don't miss " body="TODAY'S OFFER" />
            <MenuCategory onClick={() => navigate('/shop')} item={offered} />
            {/* <div className="mt-24"></div> */}
            <SectionCover title='dessert' subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} img={desertBg} />
            <MenuCategory onClick={() => navigate('/shop', { state: { idx: 3 } })} item={dessert} />
            {/* Pizza  */}
            <SectionCover title='pizza' subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} img={pizzaBg} />
            <MenuCategory item={pizza} onClick={()=>navigate('/shop' , {state : {idx : 1}})} btn='View our pizzas' />
            {/* SOUP  */}
            <SectionCover title='soup' subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} img={soupBg} />
            <MenuCategory item={soup} onClick={()=>navigate('/shop' , {state : {idx : 2}})} btn='View our Soup'/>
            {/* SOUP  */}
            <SectionCover title='salad'
                subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} img={saladBg} />
            <MenuCategory item={salad} onClick={()=>navigate('/shop' , {state : {idx : 0}})} btn='View our Salads'/>
        </div>
    );
};

export default Menu;