import React, { useState } from "react";
import { RouterProvider, Routes } from "react-router-dom";
import {FormsData} from "./context";
import router from "./router/router"
import classes from "./assets/styles/app.module.scss"
import NavBar from "./components/NavBar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    // const navigate = useNavigate();
    const [forms, setForms] = useState([])

    return (
        <FormsData.Provider value={{
            forms,
            setForms
        }}>
            <div className={classes.main}>
                <div className={classes.container}>
                    <div className={classes.header}>
                        <NavBar/>
                    </div>
                    <div className={classes.content}>
                        <Routes>
                            <RouterProvider router={router}/>
                        </Routes>                        
                    </div>
                </div>
            </div>
        </FormsData.Provider>        
    )
}

export default App;