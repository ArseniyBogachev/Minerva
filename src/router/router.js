import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Forms from '../pages/Forms.jsx';
import EnterAccount from "../pages/EnterAccount.jsx";
import NewForm from '../pages/NewForm.jsx';
import Home from "../pages/Home.jsx";
import App from "../App.jsx";
import Profile from "../pages/Profile.jsx";
import ViewForm from "../pages/ViewForm.jsx";

const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/forms",
                element: <Forms/>,
            },
            {
                path: "/forms/edit",
                element: <NewForm/>
            },
            {
                path: "/enter",
                element: <EnterAccount/>
            },
            {
                path: "/profile",
                element: <Profile/>
            },
            {
                path: "/forms/:formId",
                element: <ViewForm/>
            }
        ]
    }
    
]);

export default router