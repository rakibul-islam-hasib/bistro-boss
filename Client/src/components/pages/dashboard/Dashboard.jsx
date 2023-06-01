import React, { useContext, useEffect, useState } from 'react';
import { AiFillHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsFillCalendarCheckFill, BsJournalBookmarkFill } from 'react-icons/bs';
import { FaSwatchbook, FaUsers } from 'react-icons/fa';
import { ImSpoonKnife } from 'react-icons/im';
import { TbStarsFilled } from 'react-icons/tb';
import { TfiMenuAlt } from 'react-icons/tfi';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useAdmin } from '../../../hooks/useAdmin';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { loader, user } = useContext(AuthContext);
    const [isAdmin , loading] = useAdmin();
    const navigate = useNavigate();

    if (loading || loader) {
        return <div className="h-screen w-screen flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    }
    // const isAdmin = true;
    const userMenuItems = [
        {
            icon: <AiFillHome className="text-2xl" />,
            text: 'Home',
            to: '/dashboard'
        },
        {
            icon: <BsFillCalendarCheckFill className="text-2xl" />,
            text: 'Reservation',
            to: '/dashboard/reservation'
        },
        {
            icon: <ImSpoonKnife className="text-2xl" />,
            text: 'Payment history',
            to: '/dashboard/payment'
        },
        {
            icon: <AiOutlineShoppingCart className="text-2xl" />,
            text: 'My Cart',
            to: '/dashboard/my-cart'
        },
        {
            icon: <TbStarsFilled className="text-2xl" />,
            text: 'My Reviews',
            to: '/dashboard/my-reviews'
        },
        {
            icon: <FaSwatchbook className="text-2xl" />,
            text: 'My Bookings',
            to: '/dashboard/my-bookings'
        },
    ];
    const adminNavItems = [
        {
            icon: <AiFillHome className="text-2xl" />,
            text: 'Home',
            to: '/dashboard'
        },
        {
            icon: <BsFillCalendarCheckFill className="text-2xl" />,
            text: 'Reservation',
            to: '/dashboard/reservation'
        },
        {
            icon: <ImSpoonKnife className="text-2xl" />,
            text: 'Add Item',
            to: '/dashboard/add-item'
        },
        {
            icon: <TfiMenuAlt className="text-2xl" />,
            text: 'Manage Items',
            to: '/dashboard/manage-items'
        },
        {
            icon: <FaUsers className="text-2xl" />,
            text: 'Manage Users',
            to: '/dashboard/users'
        },
        {
            icon: <BsJournalBookmarkFill className="text-2xl" />,
            text: 'Manage Bookings',
            to: '/dashboard/admin-  bookings'
        },
    ]
    return (
        <div className="grid bg-[#F6F6F6] grid-cols-10">
            <div className="col-span-2 hidden md:block top-0 font-Cinzel px-5 py-5 bg-[#D1A054] min-h-screen">
                <div onClick={() => navigate('/')} className="text-center cursor-pointer mt-4">
                    <h1 className="uppercase text-2xl font-Cinzel font-bold">Bistro BOSS</h1>
                    <p className="tracking-[0.6rem] font-Cinzel">Restaurant</p>
                </div>
                <div className="mt-6 px-5">
                    <ul>
                        {
                            isAdmin ? adminNavItems.map((item, index) => (
                                <li key={index} className="mt-4">
                                    <NavLink to={item.to}>
                                        <span className="inline-flex w-full whitespace-nowrap uppercase items-center text-base gap-4">
                                            {item.icon} {item.text}
                                        </span>
                                    </NavLink>
                                </li>
                            )) : userMenuItems.map((item, index) => (
                                <li key={index} className="mt-4">
                                    <NavLink to={item.to}>
                                        <span className="inline-flex w-full whitespace-nowrap uppercase items-center text-base gap-4">
                                            {item.icon} {item.text}
                                        </span>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="col-span-8 w-full h-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
