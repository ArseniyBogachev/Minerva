import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Forms from '../pages/Forms.jsx';
import EnterAccount from "../pages/EnterAccount.jsx";
import NewForm from '../pages/NewForm.jsx';
import Home from "../pages/Home.jsx";
import App from "../App.jsx";
import Profile from "../pages/Profile.jsx";
import ViewForm from "../pages/ViewForm.jsx";
import AdminPanel from '../pages/AdminPanel.jsx';
import AnswersForm from '../pages/AnswersForm.jsx';

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
                path: "/forms/:formId/edit",
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
            },
            {
                path: "/admin",
                element: <AdminPanel/>
            },
            {
                path: "/forms/:formId/answers",
                element: <AnswersForm/>
            }
        ]
    }
    
]);

export default router