import React, { useState } from "react";
import classes from "../assets/styles/components/navbar.module.scss"

const NavBar = () => {
    const [auth, setAuth] = useState(true);

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.menu}>
                    {auth ? 
                    <div className={classes.menu__authorized}>
                        <span>Главная</span>
                        <span>Мои формы</span>
                    </div> : 
                    <div></div>}                    
                </div>
                <div className={classes.profile}>
                    {auth ? 
                    <div className={classes.profile__authorized}>
                        <span>Профиль</span>
                    </div> : 
                    <div className={classes.profile__nonAuthorized}>
                        <span>Вход <i class="fa-solid fa-arrow-right-to-bracket"></i></span>       
                    </div>}                                        
                </div>
            </div>
        </div>
    )
}

export default NavBar;