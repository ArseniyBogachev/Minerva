import React from "react";
import classes from "../assets/styles/components/myInput.module.scss"

const MyInput = (props) => {
    return (
        <div className={classes.main} style={{...props.otherMainStyle}}>
            <input 
                type={props.type} 
                placeholder={props.placeholder} 
                style={{...props.otherInputStyle}} 
                onChange={(e) => props.change(e.target.value)} 
                value={props.value}
            />
        </div>
    )
}

export default MyInput;