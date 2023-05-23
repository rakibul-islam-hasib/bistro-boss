import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/main/Main";
import Home from "../components/home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element : <Main />,
        children :[
            {
                path : "/",
                element : <Home />
            }
        ]
    }
])