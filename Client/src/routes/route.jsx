import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/main/Main";

export const router = createBrowserRouter([
    {
        path: "/",
        element : <Main />,
        
    }
])