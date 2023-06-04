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
import ManageItem from "../components/pages/dashboard/admin/ManageItem";
import Payment from "../components/pages/dashboard/user/payment/Payment";
import UserRoute from "./userRoute";
import AdminRoute from "./AdminRoute";
import UserHome from "../components/pages/dashboard/user/home/UserHome";
import AdminHome from "../components/pages/dashboard/admin/AdminHome";
import DashboardHome from "./DashboardHome";

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
                element: <DashboardHome />
            }, 
            //! USER ROUTE 
            {
                path: 'my-cart', 
                element  : <MyCart />
            },
            {
                path: 'user-home', 
                element : <UserHome /> 
            },
            // !ADMIN ROUTE 
            {
                path: 'users', 
                element : <Users />
            },
            {
                path : 'add-item', 
                element : <AddItem />
            }, 
            {
                path : 'manage-items', 
                element : <AdminRoute><ManageItem /></AdminRoute> 
            }, 
            {
                path : 'payment',
                element : <UserRoute><Payment /></UserRoute>
            }, 
            {
                path : 'admin-home',
                element : <AdminRoute><AdminHome /></AdminRoute>
            }

        ]
    }
])