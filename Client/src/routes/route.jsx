import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/main/Main";
import Home from "../components/home/Home";
import Menu from "../components/pages/menu/Menu";
import OurShop from "../components/pages/shop/OurShop";
import Login from "../components/pages/user/Login";
import Register from "../components/pages/user/Register";
import Dashboard from "../components/pages/dashboard/Dashboard";
import MyCart from "../components/pages/dashboard/user/MyCart";
import Users from "../components/pages/dashboard/admin/Users";
import AddItem from "../components/pages/dashboard/admin/AddItem";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/menu",
                element: <Menu />,
            },
            {
                path: "/shop",
                element: <OurShop />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "/dashboard",
                element: <div className="border">Hii</div>
            }, 
            {
                path: 'my-cart', 
                element  : <MyCart />
            }, 
            {
                path: 'users', 
                element : <Users />
            },
            {
                path : 'add-item', 
                element : <AddItem />
            }
        ]
    }
])