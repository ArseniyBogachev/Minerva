import React from "react";
import classes from "../assets/styles/components/myInput.module.scss"

const MyInput = (props) => {
    return (
        <div className={classes.main}>
            <input type="text" placeholder={props.placeholder}/>
        </div>
    )
}

export default MyInput;