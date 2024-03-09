import React, { useState } from "react";
import classes from "../assets/styles/components/navbar.module.scss"

const NavBar = ({navigate, auth, setAuth}) => {
    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.menu}>
                    {auth ? 
                    <div className={classes.menu__authorized}>
                        <span onClick={() => navigate("/")}>Главная</span>
                        <span onClick={() => navigate("/forms")}>Мои формы</span>
                    </div> : 
                    <div></div>}                    
                </div>
                <div className={classes.profile}>
                    {auth ? 
                    <div className={classes.profile__authorized}>
                        <span onClick={() => navigate("/profile")}>Профиль ({auth.name})</span>
                    </div> : 
                    <div className={classes.profile__nonAuthorized}>
                        <span onClick={() => navigate("/enter")}>Вход <i class="fa-solid fa-arrow-right-to-bracket"></i></span>       
                    </div>}                                        
                </div>
            </div>
        </div>
    )
}

export default NavBar;