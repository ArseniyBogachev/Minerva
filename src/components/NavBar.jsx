import React from "react";
import { Link } from "react-router-dom";
import classes from "../assets/styles/components/navbar.module.scss"

const NavBar = () => {
    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                {/* <Link to={'/new'}>New Form</Link>
                <Link to={'/forms'}>Forms</Link> */}
            </div>
        </div>
    )
}

export default NavBar;