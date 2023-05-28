import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/header/NavBar';
import Footer from '../../components/shared/Footer';
import UseScroll from '../../hooks/useScroll';
import { Toaster } from 'react-hot-toast';
const Main = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <UseScroll />
            <Footer />
            <Toaster />
        </div>
    );
};

export default Main;