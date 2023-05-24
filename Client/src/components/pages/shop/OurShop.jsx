import React, { useState } from 'react';
import PageCover from '../../shared/PageCover';
import shopBg from '../../../assets/shop/banner2.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useMenu } from '../../../hooks/useMenu';
import { useLocation } from 'react-router-dom';
import ShopCards from './ShopCards';
const OurShop = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [menu] = useMenu();
    const location = useLocation();
    const idx = location.state?.idx;
    // console.log(location.state.idx)
    const offered = menu.filter(item => item.category === 'offered');
    const dessert = menu.filter(item => item.category === 'dessert');
    const drinks = menu.filter(item => item.category === 'drinks');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    const pizza = menu.filter(item => item.category === 'pizza');
    return (
        <div>
            <PageCover img={shopBg} title='our shop' />

            {/* Tabs  */}

            <div className=" my-20 w-[80%] text-center mx-auto">
                <Tabs defaultIndex={idx ? idx : tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>SALAD</Tab>
                        <Tab>PIZZA</Tab>
                        <Tab>SOUP</Tab>
                        <Tab>DESSERTS</Tab>
                        <Tab>DRINKS</Tab>
                        <Tab>OFFERED</Tab>
                    </TabList>

                    <TabPanel>
                        {/* salad content  */}
                        <ShopCards data={salad} />
                    </TabPanel>
                    <TabPanel>
                        {/* PIZZA content  */}
                        <ShopCards data={pizza} />
                    </TabPanel>
                    <TabPanel>
                        {/* soup content  */}
                        <ShopCards data={soup} />
                    </TabPanel>
                    <TabPanel>
                        {/* dessert content  */}
                        <ShopCards data={dessert} />
                    </TabPanel>
                    <TabPanel>
                        {/* drinks content  */}
                        <ShopCards data={drinks} />
                    </TabPanel>
                    <TabPanel>
                        {/* Offered content  */}
                        <ShopCards data={offered} />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default OurShop;