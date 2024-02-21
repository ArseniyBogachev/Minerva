import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router"
import classes from "./assets/styles/app.module.scss"
import NavBar from "./components/NavBar.jsx";

const App = () => {
    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <div className={classes.header}>
                    <NavBar/>
                </div>
                <div className={classes.content}>
                    <RouterProvider router={router}/>
                </div>
            </div>
        </div>
    )
}

export default App;