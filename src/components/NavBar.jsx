import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import classes from "../assets/styles/components/navbar.module.scss";
import { verifyUserApi } from "../hooks/api/enterAccountApi";

const NavBar = ({navigate, auth, setAuth}) => {
    // const [cookies, _, __] = useCookies(["user"]);

    // useEffect(() => {
    //     async function verifyUser() {
    //         const response = await verifyUserApi(cookies.token);

    //         if (response) {
    //             if (response.status === 200) {
    //                 setAuth(response.data);
    //             }
    //             else {
    //                 console.log(response)
    //             }
    //         }
    //     }

    //     verifyUser()
    // }, []);

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.menu}>
                    <div className={classes.menu__authorized}>
                        <span onClick={() => navigate("/")}>Главная</span>
                        {auth ? 
                        auth.is_admin ? <span onClick={() => navigate("/forms")}>Мои формы</span> : <span></span> :
                        <span></span>}
                    </div>                   
                </div>
                <div className={classes.profile}>
                    {auth ? 
                    <div className={classes.profile__authorized}>
                        <span onClick={() => navigate("/profile")}>Профиль ({auth.login})</span>
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