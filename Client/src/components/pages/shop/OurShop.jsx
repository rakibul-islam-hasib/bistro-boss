import React, { useState } from 'react';
import PageCover from '../../shared/PageCover';
import shopBg from '../../../assets/shop/banner2.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useMenu } from '../../../hooks/useMenu';
const OurShop = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [menu] = useMenu();
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
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>SALAD</Tab>
                        <Tab>PIZZA</Tab>
                        <Tab>SOUP</Tab>
                        <Tab>DESSERTS</Tab>
                        <Tab>DRINKS</Tab>
                    </TabList>

                    <TabPanel>
                        {/* salad content  */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                            {
                                salad.map(item => <div key={item._id} className=" bg-white shadow rounded">
                                    <div className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${item.image})` }}>
                                    </div>
                                    <div className="p-4 flex flex-col items-center">
                                        <p className="text-gray-400 font-light text-xs text-center">Hammond robotics</p>
                                        <h1 className="text-gray-800 my-4 text-center mt-1">{item.name}</h1>
                                        <p className="text-center text-gray-800 mt-1">€1299</p>

                                        <button
                                            className="bg-[#E8E8E8] px-8 py-3 border-b-4 hover:bg-black hover:text-white duration-300 hover:border-b-black rounded-xl border-b-[#BB8506]">
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                                )
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        {/* salad content  */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                            {
                                pizza.map(item => <div key={item._id} className=" bg-white shadow rounded">
                                    <div className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${item.image})` }}>
                                    </div>
                                    <div className="p-4 flex flex-col items-center">
                                        <p className="text-gray-400 font-light text-xs text-center">Hammond robotics</p>
                                        <h1 className="text-gray-800 my-4 text-center mt-1">{item.name}</h1>
                                        <p className="text-center text-gray-800 mt-1">€1299</p>

                                        <button
                                            className="bg-[#E8E8E8] px-8 py-3 border-b-4 hover:bg-black hover:text-white duration-300 hover:border-b-black rounded-xl border-b-[#BB8506]">
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                                )
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                          {/* salad content  */}
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                            {
                                soup.map(item => <div key={item._id} className=" bg-white shadow rounded">
                                    <div className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${item.image})` }}>
                                    </div>
                                    <div className="p-4 flex flex-col items-center">
                                        <p className="text-gray-400 font-light text-xs text-center">Hammond robotics</p>
                                        <h1 className="text-gray-800 my-4 text-center mt-1">{item.name}</h1>
                                        <p className="text-center text-gray-800 mt-1">€1299</p>

                                        <button
                                            className="bg-[#E8E8E8] px-8 py-3 border-b-4 hover:bg-black hover:text-white duration-300 hover:border-b-black rounded-xl border-b-[#BB8506]">
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                                )
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                          {/* dessert content  */}
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                            {
                                dessert.map(item => <div key={item._id} className=" bg-white shadow rounded">
                                    <div className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${item.image})` }}>
                                    </div>
                                    <div className="p-4 flex flex-col items-center">
                                        <p className="text-gray-400 font-light text-xs text-center">Hammond robotics</p>
                                        <h1 className="text-gray-800 my-4 text-center mt-1">{item.name}</h1>
                                        <p className="text-center text-gray-800 mt-1">€1299</p>

                                        <button
                                            className="bg-[#E8E8E8] px-8 py-3 border-b-4 hover:bg-black hover:text-white duration-300 hover:border-b-black rounded-xl border-b-[#BB8506]">
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                                )
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                         {/* drinks content  */}
                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                            {
                                drinks.map(item => <div key={item._id} className=" bg-white shadow rounded">
                                    <div className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${item.image})` }}>
                                    </div>
                                    <div className="p-4 flex flex-col items-center">
                                        <p className="text-gray-400 font-light text-xs text-center">Hammond robotics</p>
                                        <h1 className="text-gray-800 my-4 text-center mt-1">{item.name}</h1>
                                        <p className="text-center text-gray-800 mt-1">€1299</p>

                                        <button
                                            className="bg-[#E8E8E8] px-8 py-3 border-b-4 hover:bg-black hover:text-white duration-300 hover:border-b-black rounded-xl border-b-[#BB8506]">
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                                )
                            }
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default OurShop;