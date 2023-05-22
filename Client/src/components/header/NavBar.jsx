import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars } from 'react-icons/fa';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FcSettings } from 'react-icons/fc';
const navLinks = [
    {
        name: 'Home',
        route: '/'
    },
    {
        name: 'All Toys',
        route: '/toys'
    },
    {
        name: 'Blog',
        route: '/blog'
    }
];

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        setIsLogin(location.pathname === '/login');
    }, [location]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    // console.log(user)
    const logOut = () => {

    };

    return (
        <motion.nav
            className="bg-black text-white w-full z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
                <div className="flex px-4 items-center justify-between py-5">
                    {/* Logo */}
                    <div className="flex-shrink-0 pl-7 md:p-0 flex items-center">
                        <h1 onClick={() => navigate('/')} className='text-2xl inline-flex items-center gap-3 cursor-pointer font-bold'><span className='text-5xl'><FcSettings /></span> Zooming Wheels</h1>
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            type="button"
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            <FaBars className="h-6 text-white hover:text-primary w-6" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden  text-black md:block">
                        <div className="flex">
                            <ul className="ml-10 flex items-center space-x-4 pr-4">
                                {navLinks.map((link) => (
                                    <li key={link.route}>
                                        <NavLink
                                            className={({ isActive }) => `font-bold ${isActive ? 'text-primary' : 'text-white'} hover:text-primary duration-300`}
                                            to={link.route}

                                            style={{ whiteSpace: 'nowrap' }}
                                        >
                                            {link.name}
                                        </NavLink>
                                    </li>
                                ))}

                            </ul>

                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="md:hidden mt-2 w-full bg-black"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {
                                navLinks.map((link) => (
                                    <NavLink
                                        key={link.route}
                                        className={({ isActive }) => `block ${isActive ? 'text-primary' : 'text-white'} px-4 py-2  hover:text-primary duration-300`}
                                        to={link.route}
                                        onClick={toggleMobileMenu}
                                    >
                                        {link.name}
                                    </NavLink>
                                ))

                            }

                            {/* Add more mobile menu links as needed */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default NavBar;
