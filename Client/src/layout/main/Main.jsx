import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/header/NavBar';
import Footer from '../../components/shared/Footer';
import UseScroll from '../../hooks/useScroll';

const Main = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <UseScroll />
            <Footer />
        </div>
    );
};

export default Main;