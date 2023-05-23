import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/header/NavBar';
import Footer from '../../components/shared/Footer';

const Main = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;