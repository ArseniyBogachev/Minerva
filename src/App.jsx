import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FormsData } from "./context";
import classes from "./assets/styles/app.module.scss"
import NavBar from "./components/NavBar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const navigate = useNavigate();
    const [forms, setForms] = useState([])

    return (
        <FormsData.Provider value={{
            forms,
            setForms
        }}>
            <div className={classes.main}>
                <div className={classes.container}>
                    <div className={classes.header}>
                        <NavBar navigate={navigate}/>                   
                    </div>
                    <div className={classes.content}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </FormsData.Provider>        
    )
}

export default App;