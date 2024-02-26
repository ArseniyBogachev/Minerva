import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Forms from '../pages/Forms.jsx';
import NewForm from '../pages/NewForm.jsx';
import Home from "../pages/Home.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/forms",
        element: <Forms/>,
    },
    {
        path: '/forms/edit/',
        element: <NewForm/>
    }
]);

export default router