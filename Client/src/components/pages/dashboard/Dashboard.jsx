import React, { useState } from 'react';
import { AiFillHome, AiOutlineShoppingCart} from 'react-icons/ai';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { ImSpoonKnife } from 'react-icons/im';
import { NavLink } from 'react-router-dom';
const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="grid grid-cols-10">
            <div className="col-span-2 font-Cinzel px-5 py-5 bg-[#D1A054] min-h-screen">
                <div className="text-center mt-4">
                    <h1 className='uppercase text-2xl font-Cinzel font-bold'>Bistro BOSS</h1>
                    <p className='tracking-[0.6rem] font-Cinzel'>Restaurant</p>
                </div>
                <div className="mt-6 px-5">
                    <ul>
                        <li>
                            <NavLink>
                                <span className='inline-flex w-full items-center uppercase text-base gap-4'><AiFillHome className='text-2xl' /> Home</span>
                            </NavLink>
                        </li>
                        <li className='mt-4'>
                            <NavLink>
                                <span className='inline-flex w-full uppercase items-center text-base gap-4'>
                                    <BsFillCalendarCheckFill className='text-2xl' /> Reservation</span>
                            </NavLink>
                        </li>
                        <li className='mt-4'>
                            <NavLink>
                                <span className='inline-flex w-full whitespace-nowrap uppercase items-center text-base gap-4'>
                                    <ImSpoonKnife className='text-2xl' /> Payment history</span>
                            </NavLink>
                        </li>
                        <li className='mt-4'>
                            <NavLink>
                                <span className='inline-flex w-full whitespace-nowrap uppercase items-center text-base gap-4'>
                                    <AiOutlineShoppingCart className='text-2xl' /> My Cart </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-span-4"></div>
        </div>
    );
};

export default Dashboard;