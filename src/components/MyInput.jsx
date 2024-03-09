import React from "react";
import classes from "../assets/styles/components/myInput.module.scss"

const MyInput = (props) => {
    return (
        <div className={classes.main} style={{...props.otherMainStyle}}>
            <input type="text" placeholder={props.placeholder} style={{...props.otherInputStyle}}/>
        </div>
    )
}

export default MyInput;