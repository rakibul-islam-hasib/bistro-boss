import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/header/NavBar';
import Footer from '../../components/shared/Footer';
import UseScroll from '../../hooks/useScroll';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../providers/AuthProvider';
const Main = () => {
    const { loader } = useContext(AuthContext);
    console.log("🚀 ~ file: Main.jsx:10 ~ Main ~ loader:", loader)
    if (loader) {
        return <div className="h-screen w-screen flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    }
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