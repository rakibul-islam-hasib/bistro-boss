import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/main/Main";
import Home from "../components/home/Home";
import Menu from "../components/pages/menu/Menu";
import OurShop from "../components/pages/shop/OurShop";
import Login from "../components/pages/user/Login";
import Register from "../components/pages/user/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element : <Main />,
        children :[
            {
                path : "/",
                element : <Home />
            }, 
            {
                path : "/menu",
                element : <Menu />, 
            },
            {
                path : "/shop",
                element : <OurShop />
            }
        ]
    }, 
    {
        path : "/login",
        element : <Login />,
    }, 
    {
        path : "/register",
        element : <Register />,
    }
])